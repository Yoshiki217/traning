import {FC, useEffect, useState, useContext, createContext} from "react"
import { Outlet, useParams } from "react-router-dom"
import { monthData, dateFormat } from "../api/dateformat"
import { useAuth } from "../api/logout"
import { postg } from "../api/postg"
import { getStorage } from "../api/storage"
import { events, eventsByMonth } from "../interfaces/event"
import { RefreshContext } from "./Slash"

export const eventsByMonthContext = createContext<
{
    [date: string]: {
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
    }[]
}
>(
  {}  
)

export const YM : FC = () => {
    const refresh = useContext(RefreshContext)
    const params = useParams()
    const auth = useAuth()
    const context = useContext(eventsByMonthContext)
    const [load, setLoad] = useState(false)
    const [data, setData] = useState(context)
    useEffect(()=>{
        setLoad(false)
        postg("eventsByMonth", {
            ...getStorage(),
            courseName: params.courseName,
            year: params.year,
            month: params.month
        }).then((json: eventsByMonth)=>{
            console.log(json)
            if(!auth(json)) return
            if(!json.status){
                return
            }
            setData(json.dates)
            setLoad(true)
        })
    }, [refresh.state, params.year, params.month])
    return (
        <>
          {
            load?
                <eventsByMonthContext.Provider value={data}>
                    <Outlet/>
                </eventsByMonthContext.Provider>
            :<></>
          }  
        </>
    )
}