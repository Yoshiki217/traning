import { FC, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatToUrl, getDateFormat } from "../api/dateformat";
import { useAuth, useLogout } from "../api/logout";
import { postg } from "../api/postg";
import { getStorage } from "../api/storage";
import { getForm, useInputs } from "../api/useInputs";
import { createEvent, createEventType } from "../interfaces/event";
import { CourseContext } from "./CourseName";
import { EventTypeRefreshContext, EventTypesContext } from "./CreateEvent";
import { EventContext } from "./EventId";
import { RefreshContext } from "./Slash";

export const CreateEventIndex : FC = () => {
    const refresh = useContext(RefreshContext)
    const eventTypeRefresh = useContext(EventTypeRefreshContext)
    const course = useContext(CourseContext)
    const eventTypes = useContext(EventTypesContext)
    const [eventTypeName, setEventTypeName] = useState('')
    const [createEventTypeMessage, setCreateEventTypeMessage] = useState(<></>)
    const [inputs, setInputs] = useInputs({
        eventName: {
            name: 'eventName',
            value: ''
        },
        eventTypeId: {
            name: 'eventTypeId',
            value: ''
        },
        eventWeightAmount: {
            name: 'eventWeightAmount',
            value: 0
        },
        eventWeightUnit: {
            name: 'eventWeightUnit',
            value: ''
        },
        eventTimesAmount: {
            name: 'eventTimesAmount',
            value: 0
        },
        eventTimesUnit: {
            name: 'eventTimesUnit',
            value: ''
        },
        date: {
            name: 'date',
            value: getDateFormat()
        }
    })
    const [message, setMessage] = useState(<></>)
    const logout = useLogout()
    const gate = useNavigate()
    const toAccount = () => {
        gate('/account')
    }
    const auth = useAuth()
    const onCreateEventTypeClick = () => {
        postg('createEventType', {
            ...getStorage(),
            eventTypeName: eventTypeName
        }).then((json: createEventType)=>{
            console.log(json)
            if(!auth(json)) return
            if(!json.status){
                setCreateEventTypeMessage(<>{json.errormessage}</>)
                return
            }
            eventTypeRefresh.setState()
        })
    }
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        postg('createEvent', {
            ...getStorage(),
            info: {
                ...getForm(inputs),
                courseName: course.courseName,
                eventWeight: {
                    amount: inputs.eventWeightAmount.value,
                    unit: inputs.eventWeigthUni
                },
                eventTimes: {
                    amount: inputs.eventTimesAmount.value,
                    unit: inputs.eventTimesUnit.value
                }
            }
        }).then((json: createEvent)=>{
            console.log(json)
            if(!auth(json)) return
            if(!json.status){
                setMessage(<>{json.errormessage}</>)
                return
            }
            gate(`../${formatToUrl(json.eventInfo.date)}`)
            refresh.setState()
        })
    }
    return (
        <>  

        </>
    )
}