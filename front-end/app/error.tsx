'use client'

import {useEffect} from "react";
import {Button} from "@nextui-org/react";
import {clearCache} from "@/app/lib/action";

export default function Page(
    {error}: {error: Error & { digest?: string }}
) {
    useEffect(() => {
        // console.log('config', config.api)
    }, []);

    return <div className={'w-screen h-screen flex justify-center items-center'}>
        <div className={'bg-white px-20 py-5 h-fit rounded-2xl flex flex-col justify-center items-center space-y-4 max-w-[100rem]'}>
            <p className={'text-3xl font-bold w-fit'}>出错了</p>
            <p className={'font-light w-fit'}>联系管理员重新验证试试吧</p>
            <p className={'w-fit'}>{error.message}</p>
            <form action={clearCache}>
                <Button color={'primary'} type={'submit'}>清除缓存</Button>
            </form>
        </div>
    </div>
}