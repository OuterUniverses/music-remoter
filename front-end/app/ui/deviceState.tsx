import {getAllDevices} from "@/app/lib/spotify";

export default async function DeviceState() {
    const state = await getAllDevices()
    return <div className={'bg-black'}>

    </div>
}