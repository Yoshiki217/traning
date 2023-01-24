import { json } from "body-parser";
import React, { ChangeEvent, createContext, FC, useContext, useState } from "react";
import { useAuth } from "../api/logout";
import { postg } from "../api/postg";
import { getStorage } from "../api/storage";
import { getForm, useInputs } from "../api/useInputs";
import { changeEventTypeName, createEventType, removeEventType } from "../interfaces/event";
import { Message } from "./Message";

export const EventTypesContext = createContext<{
    eventTypeId: number,
    eventTypeName: string
}[]>([])

export const EventTypeRefreshContext = createContext({
    state: false,
    setState: ()=>{}
})

export interface eventTypeSelectorProps {
    inputs: {
        [name: string]: {
            name: string,
            value: string | number
        }
    },
    setInputs: (event: ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>|{target: {name: string, value: string | number}})=>void,
    id?: string
}

export const EventTypeSelector: FC<eventTypeSelectorProps> = (props: eventTypeSelectorProps) => {
    const eventTypes = useContext(EventTypesContext)
    const refresh = useContext(EventTypeRefreshContext)
    const auth = useAuth()
    const [message, setMessage] = useState("")
    const find = (id: number): string => {
        for(let i of eventTypes){
            if(i.eventTypeId==id){
                return i.eventTypeName
            }
        }
        return ""
    }
    const [cint, setCint] = useState(find(Number(props.inputs.eventTypeId.value)))
    const onTypeSelect = (e: ChangeEvent<HTMLSelectElement>)=>{
        const sel = e.target
        setCint(sel.options[sel.selectedIndex].text)
        props.setInputs(e)
    }
    const onAddButtonClick = () => {
        postg('createEventType', {
            ...getStorage(),
            cInputs: cint,
            info: {
                eventTypeName: cint
            }
        }).then((json: createEventType)=>{
            console.log(json)
            if(!auth(json)) return
            setMessage(json.errormessage)
            if(!json.status){
                return
            }
            refresh.setState()
            props.setInputs({
                target: {
                    name: "eventTypeId",
                    value: json.eventTypeInfo.eventTypeId
                }
            })
        })
    }
    const onChangeClick = () => {
        postg('changeEventTypeName',{
            ...getStorage(),
            eventTypeId: props.inputs.eventTypeId.value,
            afterEventTypeName: cint
        }).then((json: changeEventTypeName)=>{
            console.log(json)
            if(!auth(json)) return
            setMessage(json.errormessage)
            if(!json.status){
                return
            }
            refresh.setState()
            // window.alert("更新しました")
        })
    }
    const onTypeDeleteClick = () =>{
        if(!window.confirm("all remove")){
            return
        }
        postg('removeEventType',
            {
                ...getStorage(),
                eventTypeId: props.inputs.eventTypeId.value
            }
        ).then((json: removeEventType)=>{
            console.log(json)
            refresh.setState()
            setCint("")
        })
    }
    return (
        <>
            <div className='w-full md:w-full px-3 mb-6'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Event Type</label>


                <select className="select select-bordered w-full max-w-xs" name={props.inputs.eventTypeId.name} value={props.inputs.eventTypeId.value} onChange={onTypeSelect}>
                    {
                        eventTypes?.map(type=>
                            <option key={type.eventTypeId} value={type.eventTypeId}>{type.eventTypeName}</option>
                        )
                    }
                </select>
            <div className="m-3 dropdown">
                <label tabIndex={0} className="btn w-12 h-12 bg-blue-400 text-lg text-white font-semibold rounded-full hover:bg-blue-500">＋</label>
                <div tabIndex={0} className="dropdown-content card card-compact w-64 p-2 shadow bg-primary text-primary-content">
                    <div className="card-body">
                        <p className="card-title">カテゴリー追加・更新</p>
                        <input type="text" placeholder="Type here" className="input w-full max-w-xs text-black" value={cint} onChange={(e)=>{setCint(e.target.value)}}/>
                        <button className="btn" type="button" onClick={onAddButtonClick}>追加</button>
                        <button className="btn" type="button" onClick={onChangeClick}>更新</button>
                        <Message message={message}/>
                    </div>

                </div>
                    
            </div>


            <div className="m-3">
                <label className="btn w-12 h-12 bg-blue-400 text-lg text-white font-semibold rounded-full hover:bg-blue-500" onClick={onTypeDeleteClick}>ー</label>
            </div>
        </div>
    </>

    )
}