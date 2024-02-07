'use server'

import {redirect} from "next/navigation";
import {config} from "@/app.config";

export async function clearCache() {
    globalThis.SA = undefined
    globalThis.token = undefined
    return redirect(config.app.authPath)
}