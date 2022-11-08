import { FC, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatToUrl } from "../api/dateformat";
import { useAuth, useLogout } from "../api/logout";
import { postg } from "../api/postg";
import { getStorage } from "../api/storage";
import { logEvent } from "../interfaces/event";
import { EventContext, EventRefreshContext } from "./EventId";

export const EventIdIndex : FC = () => {
    const [log, setLog] = useState('')
    const event = useContext(EventContext)
    const eventRefresh = useContext(EventRefreshContext)
    const [message, setMessage] = useState(<></>)
    const gate = useNavigate()
    const auth = useAuth()
    const logout = useLogout()
    const toCourseName = () => {
        gate(`../${formatToUrl(event.eventInfo.date)}`)
    }
    const onSubmit = (formEvent: FormEvent<HTMLFormElement>) => {
        formEvent.preventDefault()
        postg('logEvent', {
            ...getStorage(),
            eventId: event.eventInfo.eventId,
            logText: log
        }).then((json: logEvent)=>{
            console.log(json)
            if(!auth(json)) return
            if(!json.status){
                setMessage(<>{json.errormessage}</>)
                return
            }
            eventRefresh.setState()
        })
    }
    return (
        <>  

        </>
    )
}