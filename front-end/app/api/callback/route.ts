import {NextResponse} from "next/server";
import {AxiosError} from "axios";
import {redirect} from "next/navigation";
import {config} from "@/app.config";
import {spotifyTokenCall} from "@/app/lib/spotify";
import {writeToken} from "@/app/lib/spotify";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const error = searchParams.get('error')
    const code = searchParams.get('code')
    if (error !== null) {
        return NextResponse.json({'error': error})
    }
    if (code !== null) {
        const authOptions = {
            'code': code,
            'redirect_uri': config.api.spotifyRedirectUri,
            'grant_type': 'authorization_code'
        }
        try {
            const response = await spotifyTokenCall(authOptions)
            // console.log('response:', response)
            writeToken(response)
        } catch (error) {
            if (error instanceof AxiosError) {
                return NextResponse.json(error.response?.data)
            } else {
                return NextResponse.json({'error': error})
            }
        }
        return redirect(config.app.appPath)
    }
}