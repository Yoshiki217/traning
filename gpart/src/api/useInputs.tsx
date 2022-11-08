import { ChangeEvent, useCallback, useState } from "react"

export const useInputs = (defaultValue?: {[name: string]: {
    name: string
    value: string | number
}}): [
    {
        [name: string]: {
            name: string
            value: string | number
        }
    },
    (event: ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>)=>void
] => {
    const [inputs, setInputs] = useState(defaultValue || {})
    const setInputsExtend = useCallback((event: ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => {
        setInputs(prev=>{
            return {
                ...prev,
                [event.target.name]: {
                    name: event.target.name,
                    value: event.target.value
                }
            }
        })
    }, [defaultValue])
    return [
        inputs,
        setInputsExtend
    ]
}
export const getForm = (inputs: {
    [name: string]: {
        name: string
        value: string | number
    }
}): {} => {
    let a = {}
    for(let i in inputs){
        a={...a, [inputs[i].name]: inputs[i].value}
    }
    return a
}