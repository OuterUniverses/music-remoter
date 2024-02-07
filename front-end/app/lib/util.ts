import {config} from "@/app.config";
import {promises as fs} from 'fs';
import {redirect} from "next/navigation";

export function checkEnv(envKey: Array<string>) {
    envKey.forEach((key) => {
        if (process.env[`${key}`] === undefined) {
            throw new Error(`env ${key} not set!`)
        }
    })
}

export async function readFile(fileName: string): Promise<{ [key: string]: string }> {
    const data = await fs.readFile(process.cwd() + '/' + fileName, 'utf8')
    console.log('read data success!')
    return JSON.parse(data)
}

export async function writeFile(fileName: string, data: string) {
    console.log('writing file...', data)
    await fs.writeFile(process.cwd() + '/' + fileName, data, 'utf-8')
    console.log('Write Token success!')
}

export async function deleteFile(fileName: string) {
    const path = process.cwd() + '/' + fileName
    try {
        await fs.unlink(path);
        console.log(`File ${path} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting file ${path}:`, error);
    }
}


