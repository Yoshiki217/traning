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
    (event: ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>|{target: {name: string, value: string | number}})=>void
] => {
    const [inputs, setInputs] = useState(defaultValue || {})
    const setInputsExtend = useCallback((event: ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>|{target: {name: string, value: string | number}}) => {
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

export const useUpload = (names: {name: string, link: string}[]): [
    {
        [name: string] : {
            name: string,
            file: any,
            link: string
        }
    },
    (event: ChangeEvent<HTMLInputElement>)=>void
] => {
    const [state, setState] = useState<
        {
            [name: string]: {
                name: string,
                file: any,
                link: string
            }
        }
    >(
        names.reduce((acc, value, index)=>{
            return {
                ...acc,
                [value.name] :{
                    name: value.name,
                    file: null,
                    link: value.link
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
                    file: event.target.files? event.target.files[0]: null,
                    link: prev[event.target.name].link
                }
            }
        })
    }, [])
    return [
        state,
        setUpload
    ]
}

export const noneEmpty = (checkObject: {
    [name: string]: {
        name: string
        value: string | number
    }
}): boolean => {
    const array = Object.keys(checkObject)
    for(let key of array){
        let which = checkObject[key].value
        if(which == ""){
            console.log(key)
            return false
        }
    }
    return true
}

export const noneNull = (files: {
    [name: string] : {
        name: string,
        file: any,
        link?: string
    }
}) => {
    const array = Object.keys(files)
    for(let key of array){
        let which = files[key].file
        if(which == null){
            return false
        }
    }
    return true
}