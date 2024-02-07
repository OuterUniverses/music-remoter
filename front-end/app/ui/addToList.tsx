import {addToQueue} from "@/app/lib/spotify";
import {SubmitButton} from "@/app/ui/addToListButton";

export default function AddToList(
    {className, trackUri}: { className?: string, trackUri: string }
) {
    const handleClick = async () => {
        'use server'
        await addToQueue(trackUri)
    }

    return <form action={handleClick}>
        <SubmitButton className={className}/>
    </form>

}