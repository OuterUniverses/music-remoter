'use client'

import {Button} from "@nextui-org/react";
import {SPOTIFY_AUTH_URL} from "@/app/lib/static";
import Link from "next/link";

export function SpotifyLoginButton(
    {client_id, redirect_url, scope}: {client_id: string, redirect_url: string, scope: Array<string>}
) {
    const params = {
        'client_id': client_id,
        'response_type': 'code',
        'scope': scope.join(' '),
        'redirect_uri': redirect_url,
        'show_dialog': 'false'
    }
    const searchParams = new URLSearchParams(params).toString()
    const authUrl = `${SPOTIFY_AUTH_URL}?${searchParams}`
    return <Button variant={'shadow'} className={'bg-white'}><Link href={authUrl}>Sign in with Spotify</Link></Button>
}