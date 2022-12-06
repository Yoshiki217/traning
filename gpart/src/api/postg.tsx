export const postg = (url: string, obj: {}, files?: {
    [name: string]: {
        name: string,
        file: any
    }
}): Promise<any> => {
    const form = new FormData()
    form.append('json', JSON.stringify(obj))
    if(files){
        Object.keys(files).forEach(key=>{
            form.append(key, files[key].file)
        })
    }
    return fetch(
        'http://localhost:8081/'+url,
        {
            method: 'post',
            body: form
        }
    ).then(res=>res.json())
}

export const getPublic = (filename: string): string => {
    return `http://localhost:8081/${filename}`
}