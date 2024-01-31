import {Button, Image} from "@nextui-org/react";
import AlbumCover from "@/public/temp/album1.jpg";
import {getPlayerState, pause, play, next} from "@/app/lib/spotify";
import {revalidatePath} from "next/cache";
import { MdSkipNext, MdPlayArrow, MdOutlinePause, MdOutlineRefresh } from "react-icons/md";

export default async function Player() {
    const state = await getPlayerState() as any
    const trackName = state ? state.item.name : '播放器闲置中~'
    const artistsName = state ? state.item.artists[0].name : 'Ciallo～(∠·ω< )⌒★'
    const cover = state ? state.item.album.images[0].url : AlbumCover.src
    // console.log('state', state)

    const handlePlay = async () => {
        'use server'
        await play()
    }
    const handlePause = async () => {
        'use server'
        await pause()
    }
    const handleNext = async () => {
        'use server'
        await next()
    }

    const handleRefresh = async () => {
        'use server'
        revalidatePath('/')
    }

    return <div className={'flex flex-wrap bg-aquamarine-back p-5 relative justify-center'}>
        <div className={'flex w-full'}>
            <div className={'flex-none min-w-0'}>
                <Image src={cover} isBlurred className={'h-32 w-32 object-cover'} radius={'none'}/>
            </div>
            <div className={'flex flex-col ml-5 text-aquamarine-front flex-grow'}>
                <div className={'text-xl md:text-5xl font-black'}>{trackName}</div>
                <div className={'mt-2'}>{artistsName}</div>
            </div>
        </div>
        <div className={'md:absolute md:bottom-0 md:right-0 flex items-center pb-0 pt-5 md:pb-5 px-8 space-x-2'}>
            <form action={handleRefresh}><Button isIconOnly radius={'full'} variant={"light"} color={'secondary'}
                                               type={'submit'}><MdOutlineRefresh className={'w-6 h-auto aspect-square'}/></Button></form>
            <form action={handlePause}><Button isIconOnly radius={'full'} variant={"light"} color={'secondary'}
                                               type={'submit'}><MdOutlinePause className={'w-6 h-auto aspect-square'}/></Button></form>
            <form action={handlePlay}><Button isIconOnly radius={'full'} variant={"light"} color={'secondary'}
                                              type={'submit'}><MdPlayArrow className={'w-6 h-auto aspect-square'}/></Button></form>
            <form action={handleNext}><Button isIconOnly radius={'full'} variant={"light"} color={'secondary'}
                                              type={'submit'}><MdSkipNext className={'w-6 h-auto aspect-square'}/></Button></form>
        </div>
    </div>
}