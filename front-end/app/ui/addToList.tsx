'use client'

import {addToQueue} from "@/app/lib/spotify";
import {PlusIcon} from "@heroicons/react/16/solid";
import {Button, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import {useState} from "react";

export default function AddToList(
    {className, trackUri}: { className?: string, trackUri: string }
) {
    const [pending, setPending] = useState(false)
    const [pop, setPop] = useState(false)
    const handleAdd = async () => {
        setPending(true)
        try {
            await addToQueue(trackUri)
        } catch (error) {
            setPop(true)
            console.error(error)
        }
        setPending(false)
    }
    return <Popover isOpen={pop}>
        <PopoverTrigger>
            <Button isIconOnly isLoading={pending} className={`${className} h-10 w-10 p-2 rounded-full`}
                    color={'secondary'} type={'submit'} onClick={() => handleAdd()} onMouseLeave={() => setPop(false)}
                    aria-label={'添加到播放队列'}>
                <PlusIcon className={'w-full h-full text-white'}/>
            </Button>
        </PopoverTrigger>
        <PopoverContent>
            <div className="px-1 py-2">
                <div className="text-small font-bold">添加队列失败</div>
                <div className="text-tiny">请检查是否开启Spotify客户端</div>
            </div>
        </PopoverContent>
    </Popover>
}