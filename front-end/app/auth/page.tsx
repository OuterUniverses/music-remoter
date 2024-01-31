import {SpotifyLoginButton} from "@/app/ui/authButton";
import {config} from "@/app.config";

export default async function Page() {
    const scope = ['app-remote-control', 'user-read-playback-state', 'user-read-private', 'user-read-email']

    return <div className={'h-screen w-full flex justify-center items-center'}>
        <div className={'p-5 rounded-3xl bg-white/30'}>
            <SpotifyLoginButton client_id={config.api.spotifyClientID} redirect_url={config.api.spotifyRedirectUri} scope={scope}/>
        </div>
    </div>
}