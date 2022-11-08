export const postg = (url: string, obj: {}): Promise<any> => {
    return fetch(
        'http://localhost:8081/'+url,
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }
    ).then(res=>res.json())
}