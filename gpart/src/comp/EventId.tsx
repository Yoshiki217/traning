import { createContext, FC, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../api/logout";
import { postg } from "../api/postg";
import { getStorage } from "../api/storage";
import { event } from "../interfaces/event";
import { RefreshContext } from "./Slash";

export const EventContext = createContext<{
    eventInfo: {
        eventId: number,
        eventName: string,
        eventType: {
            eventTypeId: number,
            eventTypeName: string
        },
        eventWeight: {
            amount: number,
            unit: string
        },
        eventTimes: {
            amount: number,
            unit: string
        },
        date: string
    },
    eventLogs: {
        logAccountName: string,
        logAccountUserName: string,
        avatar: string,
        logText: string
    }[]
}>({
    eventInfo: {
        eventId: 0,
        eventName: '',
        eventType: {
            eventTypeId: 0,
            eventTypeName: ''
        },
        eventWeight: {
            amount: 0,
            unit: ''
        },
        eventTimes: {
            amount: 0,
            unit: ''
        },
        date: ''
    },
    eventLogs: []
})

export const EventRefreshContext = createContext({
    state: false,
    setState: ()=>{}
})

export const EventId : FC = () => {
    const refresh = useContext(RefreshContext)
    const context = useContext(EventContext)
    const [state, setState] = useState(false)
    const eventRefresh = {state: state, setState : ()=>setState(prev=>!prev)}
    const [load, setLoad] = useState(false)
    const [value, setValue] = useState(context)
    const auth = useAuth()
    const gate = useNavigate()
    const params = useParams()
    useEffect(()=>{
        postg('event', {
            ...getStorage(),
            eventId: params.eventId
        }).then((json: event)=>{
            console.log(json)
            if(!auth(json)) return
            if(!json.status){
                gate('../')
                return
            }
            setValue({
                eventInfo: json.eventInfo,
                eventLogs: json.eventLogs
            })
            setLoad(true)
        })
    }, [refresh.state, state])
    return (
        <>  
            {
                load ? 
                <EventContext.Provider value={value}>
                    <EventRefreshContext.Provider value={eventRefresh}>
                        <Outlet/>
                    </EventRefreshContext.Provider>
                </EventContext.Provider>
                :
                <></>
            }
        </>
    )
}
