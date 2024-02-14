import {Track, Page, Actions, Context, Device} from "@spotify/web-api-ts-sdk";

export type SpotifyTokenRespond = {
    access_token: string,
    token_type: string,
    expires_in: string,
    refresh_token: string,
    scope: string
}

export type RequestType = 'POST' | 'GET' | 'PUT'

export type ErrorMessages = {
    [statusCode: number]: string;
}

export type SearchTracks = {
    tracks: Page<Track>
}

export type PlaybackState = {
    device: Device
    repeat_state: string
    shuffle_state: boolean
    context: Context | null
    timestamp: number
    progress_ms: number
    is_playing: boolean
    item: Track
    currently_playing_type: string
    actions: Actions
}

export type Queue = {
    currently_playing: Track | null
    queue: Track[] | undefined
}