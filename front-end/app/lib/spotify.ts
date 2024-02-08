'use server'

import {config} from "@/app.config";
import axios from "axios";
import {SPOTIFY_TOKEN_URL} from "@/app/lib/static";
import {SpotifyApi} from "@spotify/web-api-ts-sdk";
import {SpotifyTokenRespond} from "@/app/lib/type";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

declare global {
    // SpotifyAPI实例
    var SA: undefined | SpotifyApi

    // token
    var token: undefined | SpotifyTokenRespond

    // 当前正在播放的设备
    var playbackDeviceID: undefined | string
}

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
    globalThis.token = undefined
    globalThis.SA = undefined
    return redirect(config.app.authPath)
}

export async function getToken() {
    const tokenObj = globalThis.token
    if (!tokenObj) {
        console.log('Token file missing! Redirecting to auth page.')
        return redirect(config.app.authPath)
    }
    return tokenObj
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

export async function writeToken(tokenRespond: SpotifyTokenRespond) {
    globalThis.token = tokenRespond
}


export async function getSA() {
    const token = await getToken()
    const clientID = config.api.spotifyClientID
    // 优先返回全局变量的SA
    if (!globalThis.SA) {
        console.log('SA not existed! Creating...')
        const SA = await createSA(token, clientID)
        globalThis.SA = SA
        return SA
    }
    if (!(await checkToken(token))) {
        console.log('Token expired! Renewing token...')
        const newToken = await renewToken(token.refresh_token)
        const SA = await createSA(newToken, clientID)
        globalThis.SA = SA
        return SA
    }
    console.log('returning global declare SA')
    return globalThis.SA
}

async function createSA(token: SpotifyTokenRespond, clientID: string) {
    const saToken = {
        access_token: token.access_token,
        token_type: token.token_type,
        expires_in: Number(token.expires_in),
        refresh_token: token.refresh_token
    }
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
    const sa = await getSA()
    await sa.player.addItemToPlaybackQueue(trackUri)
    console.log(`Added track ${trackUri} to queue.`)
    revalidatePath(config.app.appPath)
}


export async function getQueue() {
    const sa = await getSA()
    return await sa.player.getUsersQueue()
}

export async function getPlayerState() {
    const sa = await getSA()
    const state = await sa.player.getPlaybackState()
    globalThis.playbackDeviceID = state === null ? undefined : state.device.id as string
    return state
}

export async function play() {
    const deviceID = globalThis.playbackDeviceID
    if (!deviceID) return
    const sa = await getSA()
    await sa.player.startResumePlayback(deviceID)
    console.log('Toggle device play')
    revalidatePath(config.app.appPath)
}

export async function pause() {
    const deviceID = globalThis.playbackDeviceID
    if (!deviceID) return
    const sa = await getSA()
    await sa.player.pausePlayback(deviceID)
    console.log('Toggle device pause')
    revalidatePath(config.app.appPath)
}

export async function next() {
    const deviceID = globalThis.playbackDeviceID
    if (!deviceID) return
    const sa = await getSA()
    await sa.player.skipToNext(deviceID)
    await new Promise(resolve => setTimeout(resolve, 1500))
    revalidatePath(config.app.appPath)
    console.log('Toggle device next')
}

export async function getDeviceInfoByID(deviceID: string) {
    const devices = await getAllDevices()
    for (const device of devices.devices) {
        if (device.id === deviceID) {
            return device
        }
    }
}

export async function transferPlayback(targetID: string) {
    const sa = await getSA()
    await sa.player.transferPlayback([targetID], false)
    console.log(`Transfer playback to ${targetID} success`)
    revalidatePath(config.app.appPath)
}