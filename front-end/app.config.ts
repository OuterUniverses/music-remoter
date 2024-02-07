export const config = {
    "api": {
        "scope": ['app-remote-control', 'user-read-playback-state', 'user-read-private', 'user-modify-playback-state'],
        "spotifyClientID": process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
        "spotifyClientSecret": process.env.SPOTIFY_CLIENT_SECRET as string,
        "spotifyRedirectUri": process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI as string,
        "Authorization": 'Basic ' + Buffer.from(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64') as string
    },
    "player": {
        "playbackDeviceID": process.env.SPOTIFY_DEVICE_ID as string
    },
    "app": {
        "appPath": "/",
        "authPath": "/auth",
        "devicePath": "/device"
    },
}