export const postg = (url: string, obj: {}): Promise<any> => {
    const form = new FormData()
    form.append('json', JSON.stringify(obj))
    return fetch(
        'http://localhost:8081/'+url,
        {
            method: 'post',
            body: form
        }
    ).then(res=>res.json())
}