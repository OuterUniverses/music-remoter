import {getQueue} from "@/app/lib/spotify";

export default async function Queue() {
    const tracks = (await getQueue()).queue
    // console.log('queue', tracks)

    return <div className={'bg-spotify-700 p-5 max-h-64 overflow-y-scroll'}>
        <p className={'text-white text-3xl font-bold p-2'}>队列</p>
        <div>
            {
                tracks.map((track, index) => <div key={track.id + index}
                                                  className={'text-white hover:bg-gray-800 p-2 transition-colors group flex items-start md:items-center'}>
                    <span className={'font-bold mr-2'}>{index + 1}</span>
                    <div className={'flex flex-col md:flex-row'}>
                        <span>{track.name}</span>
                        {/*@ts-ignore*/}
                        <span className={'md:ml-2 font-light text-gray-400'}>{track.artists[0].name}</span>
                    </div>
                </div>)
            }
        </div>
    </div>
}