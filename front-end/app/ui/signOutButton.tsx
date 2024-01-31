import {Button} from "@nextui-org/react";
import { MdLogout } from "react-icons/md";
import {signOut} from "@/app/lib/spotify";

export default function SignOutButton() {
    const handleClick = async () => {
        'use server'
        await signOut()
    }

    return <form action={handleClick} className={'ml-2'}>
        <Button type={'submit'} className={'rounded-full bg-white p-3'} size={'lg'} isIconOnly>
            <MdLogout className={'w-5 h-5'}/>
        </Button>
    </form>
}