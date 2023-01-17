import { FC, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useLogout } from "../api/logout";
import { postg } from "../api/postg";
import { getStorage } from "../api/storage";
import { getForm, useInputs } from "../api/useInputs";
import { createEventType, updateEvent } from "../interfaces/event";
// import { EventTypeRefreshContext, EventTypesContext } from "./CreateEvent";
import { EventContext } from "./EventId";
import { RefreshContext } from "./Slash";

export const EventUpdateIndex : FC = () => {
    // const refresh = useContext(RefreshContext)
    // const eventTypeRefresh = useContext(EventTypeRefreshContext)
    // const eventTypes = useContext(EventTypesContext)
    // const event = useContext(EventContext)
    // const [eventTypeName, setEventTypeName] = useState('')
    // const [createEventTypeMessage, setCreateEventTypeMessage] = useState(<></>)
    // const [inputs, setInputs] = useInputs({
    //     eventName: {
    //         name: 'eventName',
    //         value: event.eventInfo.eventName
    //     },
    //     eventTypeId: {
    //         name: 'eventTypeId',
    //         value: event.eventInfo.eventType.eventTypeId
    //     },
    //     eventWeightAmount: {
    //         name: 'eventWeightAmount',
    //         value: event.eventInfo.eventWeight.amount
    //     },
    //     eventWeightUnit: {
    //         name: 'eventWeightUnit',
    //         value: event.eventInfo.eventWeight.unit
    //     },
    //     eventTimesAmount: {
    //         name: 'eventTimesAmount',
    //         value: event.eventInfo.eventTimes.amount
    //     },
    //     eventTimesUnit: {
    //         name: 'eventTimesUnit',
    //         value: event.eventInfo.eventTimes.unit
    //     },
    //     date: {
    //         name: 'date',
    //         value: event.eventInfo.date
    //     }
    // })
    // const [message, setMessage] = useState(<></>)
    // const logout = useLogout()
    // const gate = useNavigate()
    // const toEvent = () => {
    //     gate('../')
    // }
    // const auth = useAuth()
    // const onCreateEventTypeClick = () => {
    //     postg('createEventType', {
    //         ...getStorage(),
    //         eventTypeName: eventTypeName
    //     }).then((json: createEventType)=>{
    //         console.log(json)
    //         if(!auth(json)) return
    //         if(!json.status){
    //             setCreateEventTypeMessage(<>{json.errormessage}</>)
    //             return
    //         }
    //         eventTypeRefresh.setState()
    //     })
    // }
    // const onSubmit = (formEvent: FormEvent<HTMLFormElement>) => {
    //     formEvent.preventDefault()
    //     postg('updateEvent', {
    //         ...getStorage(),
    //         info: {
    //             ...getForm(inputs),
    //             eventId: event.eventInfo.eventId,
    //             eventWeight: {
    //                 amount: inputs.eventWeightAmount.value,
    //                 unit: inputs.eventWeigthUni
    //             },
    //             eventTimes: {
    //                 amount: inputs.eventTimesAmount.value,
    //                 unit: inputs.eventTimesUnit.value
    //             }
    //         }
    //     }).then((json: updateEvent)=>{
    //         console.log(json)
    //         if(!auth(json)) return
    //         if(!json.status){
    //             setMessage(<>{json.errormessage}</>)
    //             return
    //         }
    //         gate(`../`)
    //         refresh.setState()
    //     })
    // }
    return (
        <>  

        </>
    )
}