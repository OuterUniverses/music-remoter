import {getQueue} from "@/app/lib/spotify";

export default async function Queue() {
    const tracks = (await getQueue()).queue
    console.log('queue', tracks)
    return <div className={'bg-spotify-700 p-5 max-h-64 overflow-y-scroll'}>
        {
            tracks.map((track, index) => <div key={track.id}
                className={'text-white hover:bg-gray-800 p-2 transition-colors group flex items-center'}>
                <span className={'font-bold mr-2'}>{index + 1}</span>
                <span className={'flex-grow'}>{track.name}</span>
            </div>)
        }
    </div>
}