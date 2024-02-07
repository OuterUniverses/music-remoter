'use client'

import {MdOutlinePause, MdOutlineRefresh, MdPlayArrow, MdSkipNext, MdOutlineDevices} from "react-icons/md";
import {
    Button,
    Dropdown, DropdownItem, DropdownMenu,
    DropdownTrigger,
    Tooltip
} from "@nextui-org/react";
import {useFormStatus} from 'react-dom'
import {Devices} from "@spotify/web-api-ts-sdk";
import {transferPlayback} from "@/app/lib/spotify";
import {useState} from "react";

export function PlayButton() {
    const {pending} = useFormStatus()
    return <Button isIconOnly isLoading={pending} radius={'full'} variant={"light"} color={'secondary'}
                   type={'submit'} aria-label={'播放'}>
        <MdPlayArrow className={'w-6 h-auto aspect-square'}/>
    </Button>
}

export function PauseButton() {
    const {pending} = useFormStatus()
    return <Button isIconOnly isLoading={pending} radius={'full'} variant={"light"} color={'secondary'}
                   type={'submit'} aria-label={'暂停'}><MdOutlinePause className={'w-6 h-auto aspect-square'}/></Button>
}

export function NextButton() {
    const {pending} = useFormStatus()
    return <Button isIconOnly isLoading={pending} radius={'full'} variant={"light"} color={'secondary'}
                   type={'submit'} aria-label={'下一曲'}><MdSkipNext className={'w-6 h-auto aspect-square'}/></Button>
}

export function RefreshButton() {
    const {pending} = useFormStatus()
    return <Button isIconOnly isLoading={pending} radius={'full'} variant={"light"} color={'secondary'}
                   type={'submit'} aria-label={'刷新'}><MdOutlineRefresh
        className={'w-6 h-auto aspect-square'}/></Button>
}

export function DeviceButton(
    {selectedID, devicesList}: { selectedID?: string, devicesList?: Devices }
) {
    const [selectedKeys, setSelectedKeys] = useState(new Set([selectedID ? selectedID : '']));
    const handleDeviceSelect = async (id: string) => {
        await transferPlayback(id)
        setSelectedKeys(new Set([id]))
    }

    return <Dropdown>
        <DropdownTrigger>
            <Button isIconOnly radius={'full'} variant={'light'} color={'secondary'} aria-label={'切换设备'}
                    type={'submit'}>
                <MdOutlineDevices className={'w-5 h-auto aspect-square'}/>
            </Button>
        </DropdownTrigger>
        <DropdownMenu items={devicesList?.devices} aria-label={'可用的设备'} selectionMode={'single'}
                      onAction={(key) => handleDeviceSelect(key.toString())}
                      selectedKeys={selectedKeys}
        >
            {(device) => (
                <DropdownItem key={device.id!}>{device.name}</DropdownItem>
            )}
        </DropdownMenu>
    </Dropdown>

}