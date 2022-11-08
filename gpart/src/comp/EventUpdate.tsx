import { FC, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../api/logout";
import { postg } from "../api/postg";
import { getStorage } from "../api/storage";
import { useInputs } from "../api/useInputs";
import { eventTypes } from "../interfaces/event";
import { CreateEvent, EventTypeRefreshContext, EventTypesContext } from "./CreateEvent";
import { EventContext } from "./EventId";
import { refresh, RefreshContext } from "./Slash";

export const EventUpdate : FC = () => {
    const refresh = useContext(RefreshContext)
    const context = useContext(EventTypesContext)
    const [value, setValue] = useState(context)
    const [state, setState] = useState(false)
    const eventTypeRefresh : refresh = {state: state, setState : ()=>setState(prev=>!prev)}
    const [load, setLoad] = useState(false)
    const auth = useAuth()
    const gate = useNavigate()
    // const params = useParams()
    useEffect(()=>{
        postg('eventTypes', {
            ...getStorage()
        }).then((json: eventTypes)=>{
            console.log(json)
            if(!auth(json)) return
            if(!json.status){
                gate('/account')
                return
            }
            setValue(json.eventTypes)
            setLoad(true)
        })
    }, [refresh.state, state])
    return (
        <>
            {
                load ?
                <EventTypesContext.Provider value={value}>
                    <EventTypeRefreshContext.Provider value={eventTypeRefresh}>
                        <Outlet/>
                    </EventTypeRefreshContext.Provider>
                </EventTypesContext.Provider>
                :
                <></>
            }
        </>
    )
}