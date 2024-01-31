import {PlusIcon} from "@heroicons/react/16/solid";
import {Button} from "@nextui-org/react";
import {addToQueue} from "@/app/lib/spotify";

export default function AddToList(
    {className, trackUri}: { className?: string, trackUri: string }
) {
    const handleClick = async () => {
        'use server'
        await addToQueue(trackUri)
    }

    return <form action={handleClick}>
        <Button isIconOnly className={`${className} h-10 w-10 p-2 rounded-full`} color={'secondary'} type={'submit'}>
            <PlusIcon className={'w-full h-full text-white'}/>
        </Button>
    </form>

}