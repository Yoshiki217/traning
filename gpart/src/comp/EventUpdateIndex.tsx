import { FC, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useLogout } from "../api/logout";
import { postg } from "../api/postg";
import { getStorage } from "../api/storage";
import { getForm, useInputs } from "../api/useInputs";
import { createEventType, updateEvent } from "../interfaces/event";
import { EventContext } from "./EventId";
import { EventTypeSelector } from "./EventTypeSelector";
import { RefreshContext } from "./Slash";

export const EventUpdateIndex : FC = () => {
    const refresh = useContext(RefreshContext)
    const event = useContext(EventContext)
    const [createEventTypeMessage, setCreateEventTypeMessage] = useState(<></>)
    const [inputs, setInputs] = useInputs({
        eventName: {
            name: 'eventName',
            value: event.eventInfo.eventName
        },
        eventTypeId: {
            name: 'eventTypeId',
            value: event.eventInfo.eventType.eventTypeId
        },
        eventWeightAmount: {
            name: 'eventWeightAmount',
            value: event.eventInfo.eventWeight.amount
        },
        eventWeightUnit: {
            name: 'eventWeightUnit',
            value: event.eventInfo.eventWeight.unit
        },
        eventTimesAmount: {
            name: 'eventTimesAmount',
            value: event.eventInfo.eventTimes.amount
        },
        eventTimesUnit: {
            name: 'eventTimesUnit',
            value: event.eventInfo.eventTimes.unit
        },
        date: {
            name: 'date',
            value: event.eventInfo.date
        }
    })
    const [message, setMessage] = useState(<></>)
    const logout = useLogout()
    const gate = useNavigate()
    const toEvent = () => {
        gate('../')
    }
    const auth = useAuth()
    const onSubmit = (formEvent: FormEvent<HTMLFormElement>) => {
        formEvent.preventDefault()
        postg('updateEvent', {
            ...getStorage(),
            eventId: event.eventInfo.eventId,
            info: {
                ...getForm(inputs),
                eventId: event.eventInfo.eventId,
                eventWeight: {
                    amount: inputs.eventWeightAmount.value,
                    unit: inputs.eventWeigthUni
                },
                eventTimes: {
                    amount: inputs.eventTimesAmount.value,
                    unit: inputs.eventTimesUnit.value
                }
            }
        }).then((json: updateEvent)=>{
            console.log(json)
            if(!auth(json)) return
            if(!json.status){
                setMessage(<>{json.errormessage}</>)
                return
            }
            gate(`../`)
            refresh.setState()
        })
    }
    return (
        <>  
            <form onSubmit={onSubmit}>
                <input type="text" name={inputs.eventName.name} value={inputs.eventName.value} onChange={setInputs}/>
                <EventTypeSelector inputs={inputs} setInputs={setInputs}/>
                <input type="number" name={inputs.eventWeightAmount.name} value={inputs.eventWeightAmount.value} onChange={setInputs}/>
                <input type="text" name={inputs.eventWeightUnit.name} value={inputs.eventWeightUnit.value} onChange={setInputs}/>
                <input type="number" name={inputs.eventTimesAmount.name} value={inputs.eventTimesAmount.value} onChange={setInputs}/>
                <input type="text" name={inputs.eventTimesUnit.name} value={inputs.eventTimesUnit.value} onChange={setInputs}/>
                <input type="date" name={inputs.date.name} value={inputs.date.value} onChange={setInputs}/>
                <input type="submit" value={"アップデート"}/>
            </form>
        </>
    )
}