import Player from "@/app/ui/player";
import Search from "@/app/ui/search";
import {SpotifyApi} from "@spotify/web-api-ts-sdk";
import SongList from "@/app/ui/songList";
import {checkEnv} from "@/app/lib/util";
import {Button, User} from "@nextui-org/react";
import Link from "next/link";
import {cookies} from "next/headers";
import {checkToken} from "@/app/lib/spotify";
import {signOut} from "@/app/lib/action";
import {config} from "@/app.config";
import {ArrowRightStartOnRectangleIcon} from "@heroicons/react/24/solid"

export default async function Page(
    {searchParams}: { searchParams?: { query?: string; page?: number; } }
) {
    checkEnv(['SPOTIFY_CLIENT_ID', 'SPOTIFY_CLIENT_ID', 'SPOTIFY_REDIRECT_URI'])
    const token = checkToken()
    const sa = SpotifyApi.withAccessToken(config.api.spotifyClientID, token)
    const user = await sa.currentUser.profile()
    const devices = await sa.player.getAvailableDevices()
    const query = searchParams?.query || ''
    const currentPage = searchParams?.page || 1

    console.log('devices', devices)

    return (
        <main className="container mx-auto">
            <div className={'flex items-center'}>
                <h1 className={'font-bold text-5xl flex-grow'}>点歌台</h1>
                <User name={user.display_name} avatarProps={{src: user.images[0].url}} description={user.product}
                      className={'rounded-full bg-white px-4 py-2'}/>
                <form action={signOut} className={'ml-2'}>
                    <Button type={'submit'} className={'rounded-full bg-white p-3'} size={'lg'} isIconOnly>
                        <ArrowRightStartOnRectangleIcon/>
                    </Button>
                </form>
            </div>
            <Player/>
            <Search/>
        </main>
    );
}
