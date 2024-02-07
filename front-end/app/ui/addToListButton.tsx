'use client'
import {Button} from "@nextui-org/react";
import {PlusIcon} from "@heroicons/react/16/solid";
import { useFormStatus } from 'react-dom'

export function SubmitButton(
    {className}: {className?: string}
) {
    const { pending } = useFormStatus()
    return <Button isIconOnly isLoading={pending} className={`${className} h-10 w-10 p-2 rounded-full`} color={'secondary'} type={'submit'}>
        <PlusIcon className={'w-full h-full text-white'}/>
    </Button>
}