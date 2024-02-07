import Player from "@/app/ui/player";
import Search from "@/app/ui/search";
import SongList from "@/app/ui/songList";
import {checkEnv} from "@/app/lib/util";
import {User} from "@nextui-org/react";
import {checkDeviceOnline, getDeviceInfoByID, getUserProfile} from "@/app/lib/spotify";
import SignOutButton from "@/app/ui/signOutButton";
import Queue from "@/app/ui/queue";
import {Suspense} from "react";
import QueueSkeleton from "@/app/ui/skeleton/queueSkeleton";
import {config} from "@/app.config";

export default async function Page(
    {searchParams}: { searchParams?: { query?: string; page?: number; track_uri?: string;} }
) {
    checkEnv(['NEXT_PUBLIC_SPOTIFY_CLIENT_ID', 'SPOTIFY_CLIENT_SECRET', 'NEXT_PUBLIC_SPOTIFY_REDIRECT_URI'])
    const user = await getUserProfile()
    const query = searchParams?.query || ''
    const currentPage = searchParams?.page || 1

    return (
        <main className="container mx-auto py-10 space-y-4">
            <div className={'flex items-center'}>
                <h1 className={'font-bold text-2xl md:text-5xl bg-kleinblue-front text-kleinblue-back mb-3 py-3 px-5 -rotate-3 translate-x-1'}>点歌台</h1>
                <div className={'flex-grow'}/>
                <User name={user.display_name} avatarProps={{src: user.images[0].url}} description={user.product}
                      className={'rounded-full bg-white px-4 py-2'}/>
                <SignOutButton/>
            </div>
            <Player/>
            <Suspense fallback={<QueueSkeleton/>}>
                <Queue/>
            </Suspense>
            <Search/>
            <SongList query={query} currentPage={currentPage}/>
        </main>
    );
}
