'use server'

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function signOut() {
    console.log('Signing out')
    const cookiesData = ['access_token', 'expires_at', 'refresh_token', 'scope']
    cookiesData.forEach((c) => {
        cookies().delete(c)
    })
    return redirect('/auth')
}