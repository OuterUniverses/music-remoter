import {Button} from "@nextui-org/react";
import {SPOTIFY_AUTH_URL} from "@/app/lib/static";
import Link from "next/link";
import Image from "next/image"
import SpotifyLOGO from "@/public/icon/spotify.svg"

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
    return <Button variant={'shadow'} color={'success'}>
        <Link href={authUrl} className={'flex items-center'}>
            <Image src={SpotifyLOGO} alt={'spotify logo'} className={'h-5 w-5'}/>
            <span className={'my-auto ml-3'}>使用Spotify帳戶登陸</span>
        </Link>
    </Button>
}