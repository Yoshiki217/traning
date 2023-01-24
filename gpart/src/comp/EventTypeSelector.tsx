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
        <div style={{
            position: "relative"
        }} 
        onMouseEnter={onHover} onMouseLeave={onLeave}
        >
            <div className='w-full md:w-full px-3 mb-6'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Event Type</label>
                <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500'
                type='text' required id={props.id? props.id : undefined}
                value={cInputs} onChange={(e)=>{setCInputs(e.target.value)}}/>
                <div className="flex justify-end">
                    <button
                    onClick={onAddButtonClick}
                    className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3" type="button">Add</button>
                </div>
                <div style={
                    {
                        display: dropdownDisplay,
                        position: "absolute",
                        backgroundColor: "red"
                    }
                }>
                    {
                        eventTypes?.map(type=>
                            <div key={type.eventTypeId} >
                                <span onClick={()=>{onEventTypeChoose(type)}}>{type.eventTypeName}</span>|
                                <button onClick={()=>{onTypeDeleteClick(type)}}>del</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
        </>
    )
}