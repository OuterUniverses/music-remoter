'use server'

import {redirect} from "next/navigation";
import {config} from "@/app.config";
import {deleteRecord} from "@/app/lib/db";

export async function clearCache() {
    await deleteRecord('token')
    return redirect(config.app.authPath)
}