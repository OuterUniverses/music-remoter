import {SpotifyLoginButton} from "@/app/ui/authButton";
import {config} from "@/app.config";

export default async function Page() {
    return <div className={'h-screen w-full flex justify-center items-center bg-gray-100'}>
        <div className={'p-5 rounded-3xl bg-white/80 border-1'}>
            <SpotifyLoginButton client_id={config.api.spotifyClientID} redirect_url={config.api.spotifyRedirectUri} scope={config.api.scope}/>
        </div>
    </div>
}