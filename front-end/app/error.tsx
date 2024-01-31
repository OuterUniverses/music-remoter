'use client'

import {SpotifyLoginButton} from "@/app/ui/authButton";
import {config} from "@/app.config";
import {useEffect} from "react";

export default function Page() {
    useEffect(() => {
        console.log('config', config.api)
    }, []);

    return <div className={'w-screen h-screen flex justify-center items-center'}>
        <div className={'bg-white px-20 py-5 h-fit rounded-2xl flex flex-col justify-center items-center'}>
            <p className={'text-3xl font-bold mb-2 w-fit'}>出错了</p>
            <p className={'font-light mb-5 w-fit'}>联系管理员重新验证试试吧</p>
            <SpotifyLoginButton client_id={config.api.spotifyClientID} redirect_url={config.api.spotifyRedirectUri} scope={config.api.scope} />
        </div>
    </div>
}