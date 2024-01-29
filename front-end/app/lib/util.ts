import {SpotifyApi} from "@spotify/web-api-ts-sdk";

export async function searchTrack(sa: SpotifyApi, name: string) {
    if (name === '') return undefined
    return await sa.search(name, ["track"])
}

export function play(sa: SpotifyApi, targetDeviceID: string, songID: string) {
    
}