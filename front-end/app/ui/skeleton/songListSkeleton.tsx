export default function SongListSkeleton() {
    return <div className={'w-full px-1 pt-2 bg-white pb-5'}>
        <div className={'mx-3 my-5'}>
            <div className={'p-4 items-center flex animate-pulse'}>
                <div className={'h-full min-w-0 flex-none'}>
                    <div className={'h-24 w-24 bg-gray-300'}/>
                </div>
                <div className={'ml-5 grow space-y-2'}>
                    <div className={'text-xl bg-gray-400 h-3 w-4/12'}></div>
                    <div className={'font-light bg-gray-200 h-3 w-8/12'}></div>
                </div>
            </div>
            <div className={'p-4 items-center flex animate-pulse'}>
                <div className={'h-full min-w-0 flex-none'}>
                    <div className={'h-24 w-24 bg-gray-400'}/>
                </div>
                <div className={'ml-5 grow space-y-2'}>
                    <div className={'text-xl bg-gray-100 h-3 w-2/5'}></div>
                    <div className={'font-light bg-gray-400 h-3 w-6/12'}></div>
                </div>
            </div>
            <div className={'p-4 items-center flex animate-pulse'}>
                <div className={'h-full min-w-0 flex-none'}>
                    <div className={'h-24 w-24 bg-gray-500'}/>
                </div>
                <div className={'ml-5 grow space-y-2'}>
                    <div className={'text-xl bg-gray-600 h-3 w-5/6'}></div>
                    <div className={'font-light bg-gray-400 h-3 w-7/12'}></div>
                </div>
            </div>
            <div className={'p-4 items-center flex animate-pulse'}>
                <div className={'h-full min-w-0 flex-none'}>
                    <div className={'h-24 w-24 bg-gray-300'}/>
                </div>
                <div className={'ml-5 grow space-y-2'}>
                    <div className={'text-xl bg-gray-400 h-3 w-4/12'}></div>
                    <div className={'font-light bg-gray-200 h-3 w-8/12'}></div>
                </div>
            </div>
        </div>
    </div>
}