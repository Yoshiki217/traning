import { json } from "body-parser";
import React, { ChangeEvent, createContext, FC, useContext, useState } from "react";
import { useAuth } from "../api/logout";
import { postg } from "../api/postg";
import { getStorage } from "../api/storage";
import { useInputs } from "../api/useInputs";
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
    id?: string,
    inputs: {
        [name: string]: {
            name: string,
            value: string | number
        }
    },
    setInputs: (event: ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>|{target: {name: string, value: string | number}})=>void
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
    const [cInputs, setCInputs] = useState("")
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
        
    }
    const onFirstAddButtonClick = () => {
        console.log(mInputs)
        postg('createEventType', {
            ...getStorage(),
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
            setMInputs(getFirst())
        })
    }
    const onAddButtonClick = () => {
        console.log(mInputs)
        postg('createEventType', {
            ...getStorage(),
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
    const changeDisplay = () =>{
        if(dropdownDisplay=="block"){
            onLeave()
        } else {
            onHover()
        }
    }
    return (
        <>  
        <div style={{
            position: "relative"
        }} 
        onMouseEnter={onHover} onMouseLeave={onLeave}
        >
            <div>
                <input type="text" id={props.id? props.id : undefined}
                value={cInputs} onChange={(e)=>{setCInputs(e.target.value)}}/>
                <button type="button" onClick={onAddButtonClick}>Add</button>
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
        </>
    )
}