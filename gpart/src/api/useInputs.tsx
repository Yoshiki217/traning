import { ChangeEvent, ReactNode, useCallback, useState } from "react"
import { event } from "../interfaces/event"

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

export const useUpload = (names: string[]): [
    {
        [name: string] : {
            name: string,
            file: any
        }
    },
    (event: ChangeEvent<HTMLInputElement>)=>void
] => {
    const [state, setState] = useState<
        {
            [name: string]: {
                name: string,
                file: any,
            }
        }
    >(
        names.reduce((acc, value, index)=>{
            return {
                ...acc,
                [value] :{
                    name: value,
                    file: null
                }
            }
        }, {})
    )
    const setUpload = useCallback((event: ChangeEvent<HTMLInputElement>)=>{
        setState(prev=>{
            return {
                ...prev,
                [event.target.name]: {
                    name: event.target.name,
                    file: event.target.files? event.target.files[0]: null
                }
            }
        })
    }, [])
    return [
        state,
        setUpload
    ]
}