'use server'

import {config} from "@/app.config";
import axios, {AxiosError} from "axios";
import {SPOTIFY_API_BASE_URL, SPOTIFY_TOKEN_URL} from "@/app/lib/static";
import {ErrorMessages, RequestType, SearchTracks, SpotifyTokenRespond, PlaybackState, Queue} from "@/app/lib/type";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {deleteRecord, retrieveObject, saveObject} from "@/app/lib/db";
import {Devices, UserProfile} from "@spotify/web-api-ts-sdk";


export async function spotifyTokenCall(bodyParams: { [key: string]: string }) {
    const axiosConfig = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': config.api.Authorization
        }
    }
    const options = new URLSearchParams(bodyParams)
    return (await axios.post(SPOTIFY_TOKEN_URL, options, axiosConfig)).data as SpotifyTokenRespond
}

/**
 * 发起一个Spotify API Call
 * @param path api路径
 * @param type 请求类型
 * @param body 请求body数据
 * @param params url参数
 */
async function spotifyApiCall(path: string, type: RequestType, body: { [key: string]: any } | null, params?: {
    [key: string]: string
}) {
    const searchParams = new URLSearchParams(params)
    const token = await getToken()
    const url = `${SPOTIFY_API_BASE_URL}${path}?${searchParams.toString()}`
    const errorMessages: ErrorMessages = {
        401: 'Bad or expired token. This can happen if the user revoked a token or the access token has expired. You should re-authenticate the user.',
        403: 'Bad OAuth request (wrong consumer key, bad nonce, expired timestamp...). Unfortunately, re-authenticating the user won\'t help here.',
        429: 'The app has exceeded its rate limits.'
    }
    const axiosConfig = {
        headers: {
            Authorization: 'Bearer ' + token.access_token
        }
    }
    try {
        if (type === 'POST') {
            // console.log(`new post url: ${url}`)
            const result = await axios.post(url, body, axiosConfig)
            // console.log('post result', result)
            return result.data
        } else if (type === 'GET') {
            // console.log(`new get url: ${url}`)
            return (await axios.get(url, axiosConfig)).data as any
        } else if (type === 'PUT') {
            return (await axios.put(url, body, axiosConfig)).data as any
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError
            if (axiosError.status) {
                const message = errorMessages[axiosError.status] || 'An unexpected error occurred.';
                throw new Error(message)
            }
        } else {
            throw error
        }
    }

}

export async function signOut() {
    console.log('Signing out')
    await deleteRecord('token')
    return redirect(config.app.authPath)
}

export async function getToken() {
    let tokenObj = await retrieveObject('token')
    if (!tokenObj) {
        console.log('Token file missing! Redirecting to auth page.')
        return redirect(config.app.authPath)
    }
    if (!(await checkToken(tokenObj))) {
        tokenObj = await renewToken(tokenObj.refresh_token)
    }
    return tokenObj as SpotifyTokenRespond
}

export async function writeToken(tokenRespond: SpotifyTokenRespond) {
    await saveObject('token', tokenRespond)
}

export async function checkToken(tokenObj: SpotifyTokenRespond) {
    const currDate = new Date().toISOString()
    const expDate = new Date(Date.now() + Number(tokenObj.expires_in) * 1000).toISOString()
    // console.log(`currDate: ${currDate} expDate: ${expDate}`)
    return currDate <= expDate;
}

export async function renewToken(rToken: string) {
    const authOptions = {
        'grant_type': 'refresh_token',
        'refresh_token': rToken,
    }
    try {
        const respond = await spotifyTokenCall(authOptions)
        console.log('Renew token success!')
        return respond
    } catch (error) {
        console.error('Fail to renew token', error)
        throw new Error('无法更新身份信息')
    }
}

// export async function getSA() {
//     const token = await getToken()
//     const clientID = config.api.spotifyClientID
//     // 优先返回全局变量的SA
//     if (!globalThis.SA) {
//         console.log('SA not existed! Creating...')
//         const SA = await createSA(token, clientID)
//         globalThis.SA = SA
//         return SA
//     }
//     if (!(await checkToken(token))) {
//         console.log('Token expired! Renewing token...')
//         const newToken = await renewToken(token.refresh_token)
//         const SA = await createSA(newToken, clientID)
//         globalThis.SA = SA
//         return SA
//     }
//     return globalThis.SA
// }

// async function createSA(token: SpotifyTokenRespond, clientID: string) {
//     const saToken = {
//         access_token: token.access_token,
//         token_type: token.token_type,
//         expires_in: Number(token.expires_in),
//         refresh_token: token.refresh_token
//     }
//     return SpotifyApi.withAccessToken(clientID, saToken)
// }

export async function getUserProfile() {
    return await spotifyApiCall('/me', 'GET', null) as UserProfile
}

export async function getAllDevices() {
    // const sa = await getSA()
    // return await sa.player.getAvailableDevices()
    return await spotifyApiCall('/me/player/devices', 'GET', null) as Devices
}

export async function searchTrack(name: string, currentPage: number, limit: 10 | 20) {
    const offset = (currentPage - 1) * 20
    const type = ["track"]
    if (name === '') return undefined
    // const sa = await getSA()
    // return await sa.search(name, ["track"], undefined, limit, offset, 'audio')
    const options = {
        q: name,
        type: type.toString(),
        limit: limit.toString(),
        offset: offset.toString(),
        include_external: "audio"
    }
    return await spotifyApiCall('/search', 'GET', null, options) as SearchTracks
}

export async function addToQueue(trackUri: string) {
    // const sa = await getSA()
    // await sa.player.addItemToPlaybackQueue(trackUri)
    const options = {
        uri: trackUri
    }
    await spotifyApiCall('/me/player/queue', 'POST', null, options)
    console.log(`Added track ${trackUri} to queue.`)
    revalidatePath(config.app.appPath)
}


export async function getQueue() {
    // const sa = await getSA()
    // return await sa.player.getUsersQueue()
    return await spotifyApiCall('/me/player/queue', 'GET', null) as Queue
}

export async function getPlayerState() {
    // const sa = await getSA()
    // return await sa.player.getPlaybackState()
    return await spotifyApiCall('/me/player', 'GET', null) as PlaybackState
}

export async function play(deviceID: string | undefined) {
    if (!deviceID) return
    // const sa = await getSA()
    // await sa.player.startResumePlayback(deviceID)
    const options = {
        device_id: deviceID
    }
    await spotifyApiCall('/me/player/play', 'PUT', null, options)
    console.log('Toggle device play')
    revalidatePath(config.app.appPath)
}

export async function pause(deviceID: string | undefined) {
    if (!deviceID) return
    // const sa = await getSA()
    // await sa.player.pausePlayback(deviceID)
    const options = {
        device_id: deviceID
    }
    await spotifyApiCall('/me/player/pause', 'PUT', null, options)
    console.log('Toggle device pause')
    revalidatePath(config.app.appPath)
}

export async function next(deviceID: string | undefined) {
    if (!deviceID) return
    // const sa = await getSA()
    // await sa.player.skipToNext(deviceID)
    const options = {
        device_id: deviceID
    }
    await spotifyApiCall('/me/player/next', 'POST', null, options)
    await new Promise(resolve => setTimeout(resolve, 1500))
    revalidatePath(config.app.appPath)
    console.log('Toggle device next')
}

export async function transferPlayback(targetID: string) {
    // const sa = await getSA()
    // await sa.player.transferPlayback([targetID], false)
    const options = {
        "device_ids": [targetID]
    }
    await spotifyApiCall('/me/player', 'PUT', options)
    console.log(`Transfer playback to ${targetID} success`)
    revalidatePath(config.app.appPath)
}