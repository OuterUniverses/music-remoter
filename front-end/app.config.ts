export const config = {
    "api": {
        "spotifyClientID": process.env.SPOTIFY_CLIENT_ID as string,
        "spotifyClientSecret": process.env.SPOTIFY_CLIENT_SECRET as string,
        "spotifyRedirectUri": process.env.SPOTIFY_REDIRECT_URI as string,
        "Authorization": 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64') as string
    }
}