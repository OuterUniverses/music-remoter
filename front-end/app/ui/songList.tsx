import {Image} from "@nextui-org/react";
import {searchTrack} from "@/app/lib/spotify";
import AddToList from "@/app/ui/addToList";
import Pagination from "@/app/ui/pagination";
import {MdOutlineManageSearch} from "react-icons/md";

export default async function SongList(
    {query, currentPage}: { query: string, currentPage: number }
) {
    const searchLimit = 20
    const searchResult = await searchTrack(query, currentPage, searchLimit)

    return <div
        className="w-full px-1 pt-2 bg-white pb-5" id={'songList'}>
        <div className={'mx-3 my-5'}>
            {
                searchResult ? searchResult.tracks.items.map((item) => <div
                    key={item.id}
                    className={'p-4 items-center flex hover:bg-gray-100 transition-colors group'}
                >
                    <div className={'h-full min-w-0 flex-none'}>
                        <Image src={item.album.images[1].url} className={'h-24 object-cover aspect-square'}
                               alt={`专辑${item.album.name}封面`}
                               isBlurred radius={'none'}/>
                    </div>
                    <div className={'ml-5 grow'}>
                        <div className={'text-xl'}>{item.name}</div>
                        <div className={'font-light'}>{item.artists[0].name}</div>
                    </div>
                    <AddToList
                        className={'justify-items-end opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'}
                        trackUri={item.uri}/>
                </div>) : <MdOutlineManageSearch className={'mx-auto h-20 w-20 text-gray-400'} />
            }
        </div>
        <Pagination totalPages={searchResult ? Math.ceil(searchResult.tracks.total / searchLimit) : 0}/>
    </div>
}

