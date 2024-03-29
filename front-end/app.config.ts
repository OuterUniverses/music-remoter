export const config = {
    "api": {
        "scope": ['app-remote-control', 'user-read-playback-state', 'user-read-private', 'user-modify-playback-state'],
        "spotifyClientID": process.env.SPOTIFY_CLIENT_ID as string,
        "spotifyClientSecret": process.env.SPOTIFY_CLIENT_SECRET as string,
        "spotifyRedirectUri": process.env.SITE + '/api/callback' as string,
        "Authorization": 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64') as string
    },
    "player": {
        "playbackDeviceID": process.env.SPOTIFY_DEVICE_ID as string
    },
    "app": {
        "site": process.env.SITE as string,
        "appPath": "/",
        "authPath": "/auth",
        "devicePath": "/device"
    },
}