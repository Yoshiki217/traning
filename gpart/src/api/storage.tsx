export type storageType = {
    accessId: number | undefined
    sign: string | undefined
}

export const getStorage = (): storageType => {
    return {
        accessId: Number(localStorage.getItem('accessId')) || undefined,
        sign : String(localStorage.getItem('sign')) || undefined
    }
}

export const setStorage = (json: storageType) => {
    localStorage.setItem('accessId', String(json.accessId))
    localStorage.setItem('sign', String(json.sign))
}