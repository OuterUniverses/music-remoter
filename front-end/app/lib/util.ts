
export function checkEnv(envKey: Array<string>) {
    envKey.forEach((key) => {
        // console.log(`check ${key}: ${process.env[`${key}`]}`)
        if (process.env[`${key}`] === undefined) {
            throw new Error(`env ${key} not set!`)
        }
    })
}