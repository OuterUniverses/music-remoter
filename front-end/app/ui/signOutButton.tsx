import {Button} from "@nextui-org/react";
import {ArrowRightStartOnRectangleIcon} from "@heroicons/react/24/solid";
import {signOut} from "@/app/lib/spotify";

export default function SignOutButton() {
    const handleClick = async () => {
        'use server'
        await signOut()
    }

    return <form action={handleClick} className={'ml-2'}>
        <Button type={'submit'} className={'rounded-full bg-white p-3'} size={'lg'} isIconOnly>
            <ArrowRightStartOnRectangleIcon/>
        </Button>
    </form>
}