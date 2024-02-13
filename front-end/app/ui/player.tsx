import {Image} from "@nextui-org/react";
import AlbumCover from "@/public/temp/album1.jpg";
import {getPlayerState, pause, play, next} from "@/app/lib/spotify";
import {revalidatePath} from "next/cache";
import {config} from "@/app.config";
import {DeviceButton, NextButton, PauseButton, PlayButton, RefreshButton} from "@/app/ui/playerButton";

export default async function Player() {
    const state = await getPlayerState()
    const currDeviceID = state ? state.device.id as string : undefined
    const trackName = state && state.item ? state.item.name : '播放器闲置中~'
    const artistsName = state && state.item ? state.item.artists[0].name : 'Ciallo～(∠·ω< )⌒★'
    const cover = state && state.item ? state.item.album.images[0].url : AlbumCover.src

    const handlePlay = async () => {
        'use server'
        await play(currDeviceID)
    }
    const handlePause = async () => {
        'use server'
        await pause(currDeviceID)
    }
    const handleNext = async () => {
        'use server'
        await next(currDeviceID)
    }

    const handleRefresh = async () => {
        'use server'
        revalidatePath(config.app.appPath)
    }

    return <div className={'flex flex-wrap bg-aquamarine-back p-5 relative justify-center'}>
        <div className={'flex w-full'}>
            <div className={'flex-none min-w-0'}>
                <Image src={cover} isBlurred className={'h-32 w-32 object-cover'} radius={'none'} alt={`歌曲${trackName}封面`}/>
            </div>
            <div className={'flex flex-col ml-5 text-aquamarine-front flex-grow'}>
                <div className={'text-xl md:text-5xl font-black'}>{trackName}</div>
                <div className={'mt-2'}>{artistsName}</div>
            </div>
        </div>
        <div className={'md:absolute md:bottom-0 md:right-0 flex items-center pb-0 pt-5 md:pb-5 px-8 space-x-2'}>
            <DeviceButton selectedID={currDeviceID}/>
            <form action={handleRefresh}><RefreshButton/></form>
            <form action={handlePause}><PauseButton/></form>
            <form action={handlePlay}><PlayButton/></form>
            <form action={handleNext}><NextButton/></form>
        </div>
    </div>
}