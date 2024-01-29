import {Image} from "@nextui-org/react";
import AlbumCover from "@/public/temp/album1.jpg";

export default function Player() {
    return <div className={'flex mt-10'}>
        <Image src={AlbumCover.src} isBlurred className={'h-32 w-32 rounded-2xl object-cover'}/>
        <div className={'flex flex-col ml-5'}>
            <div className={'text-xl'}>Victory over Truth</div>
            <div className={'mt-2 font-light'}>Fox Stevenson</div>
        </div>
    </div>
}