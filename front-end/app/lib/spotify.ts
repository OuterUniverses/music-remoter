import {config} from "@/app.config";
import axios from "axios";
import {SPOTIFY_TOKEN_URL} from "@/app/lib/static";
import {SpotifyApi} from "@spotify/web-api-ts-sdk";
import {SpotifyTokenRespond} from "@/app/lib/type";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {deleteFile, readFile, writeFile} from "@/app/lib/util";

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

export async function signOut() {
    console.log('Signing out')
    await deleteFile(config.tokenFile)
    return redirect('/auth')
}

export async function getToken() {
    try {
        const tokenObj = await readFile(config.tokenFile) as SpotifyTokenRespond
        const currDate = new Date().toISOString()
        const expDate = new Date(Date.now() + Number(tokenObj.expires_in) * 1000).toISOString()
        // console.log(`currDate: ${currDate} expDate: ${expDate}`)
        if (currDate > expDate) {
            console.log('Token expired, renewing token.')
            await renewToken(tokenObj.refresh_token)
        }
        return tokenObj
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            console.log('Token file missing! Redirecting to auth page.')
            return redirect('/auth')
        }
        throw Error
    }
}

export async function renewToken(rToken: string) {
    const authOptions = {
        'grant_type': 'refresh_token',
        'refresh_token': rToken,
    }
    try {
        const respond = await spotifyTokenCall(authOptions)
        console.log('Renew token success!')
        await writeToken(respond)
    } catch (error) {
        console.error('Fail to renew token', error)
    }
}

export async function writeToken(tokenRespond: SpotifyTokenRespond) {
    await writeFile(config.tokenFile, JSON.stringify(tokenRespond))
}


export async function getSA() {
    const token = await getToken()
    const saToken = {
        access_token: token.access_token,
        token_type: token.token_type,
        expires_in: Number(token.expires_in),
        refresh_token: token.refresh_token
    }
    const clientID = config.api.spotifyClientID
    return SpotifyApi.withAccessToken(clientID, saToken)
}

export async function getUserProfile() {
    const sa = await getSA()
    return await sa.currentUser.profile()
}

export async function getAllDevices() {
    const sa = await getSA()
    return await sa.player.getAvailableDevices()
}

export async function searchTrack(name: string) {
    if (name === '') return undefined
    const sa = await getSA()
    return await sa.search(name, ["track"])
}

export async function addToQueue(trackUri: string) {
    const deviceID = config.player.playbackDeviceID
    const sa = await getSA()
    await sa.player.addItemToPlaybackQueue(trackUri, deviceID)
    console.log(`Added track ${trackUri} to queue.`)
    revalidatePath('/')
}


export async function getQueue() {
    const sa = await getSA()
    return await sa.player.getUsersQueue()
}

export async function getPlayerState() {
    const sa = await getSA()
    return await sa.player.getPlaybackState()
}

export async function play() {
    const deviceID = config.player.playbackDeviceID
    const sa = await getSA()
    await sa.player.startResumePlayback(deviceID)
    console.log('Toggle device play')
    revalidatePath('/')
}

export async function pause() {
    const deviceID = config.player.playbackDeviceID
    const sa = await getSA()
    await sa.player.pausePlayback(deviceID)
    console.log('Toggle device pause')
    revalidatePath('/')
}

export async function next() {
    const deviceID = config.player.playbackDeviceID
    const sa = await getSA()
    await sa.player.skipToNext(deviceID)
    await new Promise(resolve => setTimeout(resolve, 1500))
    revalidatePath('/')
    console.log('Toggle device next')
}