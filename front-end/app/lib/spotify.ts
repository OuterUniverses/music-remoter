import {config} from "@/app.config";
import axios from "axios";
import {SPOTIFY_TOKEN_URL} from "@/app/lib/static";
import {SpotifyApi} from "@spotify/web-api-ts-sdk";
import {SpotifyTokenRespond} from "@/app/lib/type";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

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

export function checkToken(): SpotifyTokenRespond {
    const aToken = cookies().get('access_token')
    const expIn = cookies().get('expires_in')
    const rToken = cookies().get('refresh_token')
    const tokenType = cookies().get('token_type')
    const scope = cookies().get('scope')

    if (aToken === undefined || expIn === undefined || rToken === undefined || tokenType === undefined || scope === undefined) {
        console.log('Check token params undefined! Redirecting to auth page.', [aToken, expIn, rToken, tokenType, scope])
        return redirect('/auth')
    }
    return {
        access_token: aToken.value,
        expires_in: Number(expIn.value),
        refresh_token: rToken.value,
        token_type: tokenType.value,
        scope: scope.value
    }
}

export function writeToken(tokenRespond: SpotifyTokenRespond) {
    cookies().set('access_token', tokenRespond.access_token)
    cookies().set('expires_in', tokenRespond.expires_in.toString())
    cookies().set('refresh_token', tokenRespond.refresh_token)
    cookies().set('token_type', tokenRespond.token_type)
    cookies().set('scope', tokenRespond.scope)
}

export async function searchTrack(sa: SpotifyApi, name: string) {
    if (name === '') return undefined
    return await sa.search(name, ["track"])
}