'use client'

import {PlusIcon} from "@heroicons/react/16/solid";

export default function AddToList(
    {className}: {className?: string}
){
    const handleClick = () => {
        console.log('click')
    }

    return <div className={`${className} h-10 w-10 p-2 rounded-full bg-blue-600`} onClick={() => handleClick()}>
        <PlusIcon className={'w-full h-full text-white'}/>
    </div>
}