import {config} from "@/app.config";
import axios from "axios";
import {SPOTIFY_TOKEN_URL} from "@/app/lib/static";
import {SpotifyApi} from "@spotify/web-api-ts-sdk";
import {SpotifyTokenRespond} from "@/app/lib/type";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

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
    const cookiesData = ['access_token', 'expires_at', 'refresh_token', 'scope']
    cookiesData.forEach((c) => {
        cookies().delete(c)
    })
    return redirect('/auth')
}

export async function getToken(): Promise<SpotifyTokenRespond> {
    const aToken = cookies().get('access_token')
    const expIn = cookies().get('expires_in')
    const rToken = cookies().get('refresh_token')
    const tokenType = cookies().get('token_type')
    const scope = cookies().get('scope')

    if (aToken === undefined || expIn === undefined || rToken === undefined || tokenType === undefined || scope === undefined) {
        console.log('Check token params undefined! Redirecting to auth page.', [aToken, expIn, rToken, tokenType, scope])
        return redirect('/auth')
    }
    const currDate = new Date().toISOString()
    const expDate = new Date(Date.now() + Number(expIn.value) * 1000).toISOString()
    // console.log(`currDate: ${currDate} expDate: ${expDate}`)
    if (currDate > expDate) {
        console.log('Token expired, renewing token.')
        await renewToken(rToken.value)
    }
    return {
        access_token: aToken.value,
        expires_in: Number(expIn.value),
        refresh_token: rToken.value,
        token_type: tokenType.value,
        scope: scope.value
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
        writeToken(respond)
    } catch (error) {
        console.error('Fail to renew token', error)
    }
}

export function writeToken(tokenRespond: SpotifyTokenRespond) {
    cookies().set('access_token', tokenRespond.access_token)
    cookies().set('expires_in', tokenRespond.expires_in.toString())
    cookies().set('refresh_token', tokenRespond.refresh_token)
    cookies().set('token_type', tokenRespond.token_type)
    cookies().set('scope', tokenRespond.scope)
}

export async function getSA() {
    const token = await getToken()
    const clientID = config.api.spotifyClientID
    return SpotifyApi.withAccessToken(clientID, token)
}

export async function getUserProfile() {
    const sa = await getSA()
    return await sa.currentUser.profile()
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
}

export async function pause() {
    const deviceID = config.player.playbackDeviceID
    const sa = await getSA()
    await sa.player.pausePlayback(deviceID)
    console.log('Toggle device pause')
}

export async function next() {
    const deviceID = config.player.playbackDeviceID
    const sa = await getSA()
    await sa.player.skipToNext(deviceID)
    await new Promise(resolve => setTimeout(resolve, 1500))
    revalidatePath('/')
    console.log('Toggle device next')
}