import { json } from "body-parser";
import React, { ChangeEvent, createContext, FC, useContext, useState } from "react";
import { useAuth } from "../api/logout";
import { postg } from "../api/postg";
import { getStorage } from "../api/storage";
import { getForm, useInputs } from "../api/useInputs";
import { createEventType, removeEventType } from "../interfaces/event";

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
    const getFirst = (): {eventTypeId: number, eventTypeName: string} => {
        if(eventTypes.length>0){
            return eventTypes[0]
        }
        return {
            eventTypeId: -1,
            eventTypeName: ""
        }
    }
    const findTypeName = (id: number): {eventTypeId: number, eventTypeName: string} => {
        const filling = eventTypes.filter(type=>type.eventTypeId==id)
        if(filling.length==1){
            return filling[0]
        }
        return {eventTypeId: -1, eventTypeName: ""}
    }
    const [mInputs, setMInputs] = useState(findTypeName(props.inputs.eventTypeId.value as number))
    const [cInputs, setCInputs] = useState(mInputs.eventTypeName)
    const [dropdownDisplay, setDropdownDisplay] = useState("none")
    
    const onHover = ()=>{
        setDropdownDisplay("block")
    }
    const onLeave = () => {
        setDropdownDisplay("none")
    }
    const onEventTypeChoose = (type: {eventTypeId: number, eventTypeName: string}) => {
        const id = type.eventTypeId
        const name = type.eventTypeName
        props.setInputs({
            target: {
                name: props.inputs.eventTypeId.name,
                value: id
            }
        })
        setMInputs(type)
        setCInputs(name)
        
    }
    const onAddButtonClick = () => {
        console.log(mInputs)
        postg('createEventType', {
            ...getStorage(),
            cInputs: cInputs,
            info: {
                eventTypeName: cInputs
            }
        }).then((json: createEventType)=>{
            console.log(json)
            if(!auth(json)) return
            if(!json.status){
                console.log(json.errormessage)
                return
            }
            refresh.setState()
            setCInputs("")
        })
    }
    const onTypeDeleteClick = (type: {eventTypeId: number, eventTypeName: string}) =>{
        const id = type.eventTypeId
        if(!window.confirm("all remove")){
            return
        }
        postg('removeEventType',
            {
                ...getStorage(),
                eventTypeId: id
            }
        ).then((json: removeEventType)=>{
            console.log(json)
            refresh.setState()
            if(mInputs.eventTypeId==id){
                setMInputs(getFirst())
            }
        })
    }
    return (
        <>
            <div className='w-full md:w-full px-3 mb-6'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Event Type</label>
                <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Who shot first?</option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                </select>
                <div className="m-3 dropdown">
                    <label tabIndex={0} className="btn w-12 h-12  bg-blue-400 text-lg text-white font-semibold rounded-full hover:bg-blue-500">＋</label>
                    <div tabIndex={0} className="dropdown-content card card-compact w-64 p-2 shadow bg-primary text-primary-content">
                        <div className="card-body">
                            <p className="card-title">カテゴリー追加</p>
                            <input type="text" placeholder="Type here" className="input w-full max-w-xs" />
                            <button className="btn">追加</button>
                            <button className="btn">更新</button>
                            <p>(登録済み)：</p>
                        </div>
                    </div>
                </div>
                <div className="m-3">
                    <label className="btn w-12 h-12  bg-blue-400 text-lg text-white font-semibold rounded-full hover:bg-blue-500">－</label>
                </div>
                    
            </div>
        
        </>
    )
}