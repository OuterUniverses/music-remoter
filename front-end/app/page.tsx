import Player from "@/app/ui/player";
import Search from "@/app/ui/search";
import {SpotifyApi} from "@spotify/web-api-ts-sdk";
import SongList from "@/app/ui/songList";

const CLIENT_ID = process.env.CLIENT_ID
const SECRET = process.env.SECRET

export default function Page(
    {searchParams}: { searchParams?: { query?: string; page?: number; } }
) {
    if (CLIENT_ID === undefined || SECRET === undefined) {
        throw new Error('Client_id or secret not set!')
    }
    const sa = SpotifyApi.withClientCredentials(CLIENT_ID, SECRET);
    const query = searchParams?.query || ''
    const currentPage = searchParams?.page || 1

    return (
        <main className="container mx-auto">
            <h1 className={'font-bold text-5xl'}>点歌台</h1>
            <Player/>
            <Search/>
            <SongList query={query} currentPage={currentPage} sa={sa}/>
        </main>
    );
}
