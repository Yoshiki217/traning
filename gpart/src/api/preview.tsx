export const imagePreview = (id: string, list: {
    [name: string]: {
        name: string,
        file: any
    }
}) => {
    const preview = () => {
        const obj = list[id]
        if(obj.file){
            return URL.createObjectURL(obj.file)
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