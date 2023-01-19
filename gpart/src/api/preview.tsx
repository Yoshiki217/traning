import { getPublic } from "./postg"

export const imagePreview = (id: string, list: {
    [name: string]: {
        name: string,
        file: any,
        link: string
    }
}) => {
    const preview = () => {
        const obj = list[id]
        if(obj.file){
            return URL.createObjectURL(obj.file)
        }
        if(obj.link){
            return getPublic(obj.link)
        }
        return ''
    }
    return (
        <>
            <label htmlFor={id}>
                <img src={preview()} alt="画像" />
            </label>
        </>
    )
}