export function checkEnv(envKey: Array<string>) {
    envKey.forEach((key) => {
        if (process.env[`${key}`] === undefined) {
            throw new Error(`env ${key} not set!`)
        }
    })
}


