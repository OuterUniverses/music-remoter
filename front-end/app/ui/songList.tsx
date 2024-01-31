import {Image} from "@nextui-org/react";
import {searchTrack} from "@/app/lib/spotify";
import AddToList from "@/app/ui/addToList";

export default async function SongList(
    {query, currentPage}: { query: string, currentPage: number }
) {
    const searchResult = await searchTrack(query)

    return <div
        className="w-full px-1 py-2 bg-white">
        <div className={'mx-3 my-5'}>
            {
                searchResult ? searchResult.tracks.items.map((item) => <div
                    key={item.id}
                    className={'p-4 items-center flex hover:bg-gray-100 transition-colors group'}
                >
                    <div className={'h-full min-w-0 flex-none'}>
                        <Image src={item.album.images[1].url} className={'h-24 object-cover aspect-square'}
                               isBlurred radius={'none'}/>
                    </div>
                    <div className={'ml-5 grow'}>
                        <div className={'text-xl'}>{item.name}</div>
                        <div className={'font-light'}>{item.artists[0].name}</div>
                    </div>
                    <AddToList
                        className={'justify-items-end opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'}
                        trackUri={item.uri}/>
                </div>) : <div className={'h-20'}></div>
            }
        </div>
    </div>
}

