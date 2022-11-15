import { createContext, FC, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { dateFormat } from "../api/dateformat";
import { useAuth } from "../api/logout";
import { postg } from "../api/postg";
import { getStorage } from "../api/storage";
import { events } from "../interfaces/event";
import { RefreshContext } from "./Slash";

export const EventsContext = createContext<{
    eventId: number,
    eventName: string
    eventType: {
        eventTypeId: number,
        eventTypeName: string
    }
    eventWeight: {
        amount: number,
        unit: string
    }
    eventTimes: {
        amount: number,
        unit: string
    }
    date: string
}[]>([])

export const YMD : FC = () => {
    const refresh = useContext(RefreshContext)
    const context = useContext(EventsContext)
    const params = useParams()
    const [value, setValue] = useState(context)
    const [load, setLoad] = useState(false)
    const auth = useAuth()
    const gate = useNavigate()
    useEffect(()=>{
        postg('events', {
            ...getStorage(),
            courseName: params.courseName,
            date: dateFormat(Number(params.year), Number(params.month), Number(params.date))
        }).then((json: events)=>{
            console.log(json)
            if(!auth(json)) return
            if(!json.status){
                gate('/account')
                return
            }
            setValue(json.events)
            setLoad(true)
        })
    }, [refresh.state, params.year, params.month, params.date])
    return (
        <>
            {
                load ? 
                <EventsContext.Provider value={value}>
                    <Outlet/>
                </EventsContext.Provider>
                :
                <></>
            }
        </>
    )
}