import {Image, Listbox, ListboxItem} from "@nextui-org/react";
import {SpotifyApi} from "@spotify/web-api-ts-sdk";
import {searchTrack} from "@/app/lib/spotify";
import AddToList from "@/app/ui/addToList";

export default async function SongList(
    {query, currentPage, sa}: { query: string, currentPage: number, sa: SpotifyApi }
) {
    const searchResult = await searchTrack(sa, query)
    const handleSongSelect = (songID: string) => {

    }

    if (searchResult === undefined) {
        return <div></div>
    }

    return <div
        className="w-full border-small px-1 py-2 mt-10 rounded-small border-default-200 dark:border-default-100">
        <div className={'mx-3 my-5'}>
            {
                searchResult.tracks.items.map((item) => <div
                    key={item.id}
                    className={'p-4 items-center flex hover:bg-gray-900 rounded-2xl transition-colors group'}
                >
                    <div className={'h-full min-w-0 flex-none'}>
                        <Image src={item.album.images[1].url} className={'h-24 object-cover aspect-square'}
                               isBlurred/>
                    </div>
                    <div className={'ml-5 grow'}>
                        <div className={'text-xl'}>{item.name}</div>
                        <div className={'font-light'}>{item.artists[0].name}</div>
                    </div>
                    <AddToList className={'justify-items-end opacity-0 group-hover:opacity-100 transition-opacity'}/>
                </div>)
            }
        </div>
    </div>
}

