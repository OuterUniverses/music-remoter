export default function QueueSkeleton() {
    return <div className={'bg-black p-8 h-64 overflow-hidden'}>
        <div className={'animate-pulse flex flex-col justify-between h-full'}>
            <div className={'bg-gray-800 w-8/12 h-5'}/>
            <div className={'bg-gray-800 w-4/12 h-5'}/>
            <div className={'bg-gray-800 w-2/5 h-5'}/>
            <div className={'bg-gray-800 w-3/6 h-5'}/>
            <div className={'bg-gray-800 w-5/6 h-5'}/>
            <div className={'bg-gray-800 w-2/5 h-5'}/>
        </div>
    </div>
}