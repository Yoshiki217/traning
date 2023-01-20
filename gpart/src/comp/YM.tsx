import {FC, useEffect, useState, useContext} from "react"
import { useParams } from "react-router-dom"
import { monthData, dateFormat } from "../api/dateformat"
import { postg } from "../api/postg"
import { getStorage } from "../api/storage"
import { events } from "../interfaces/event"
import { RefreshContext } from "./Slash"
export const YM : FC = () => {
    const refresh = useContext(RefreshContext)
    const params = useParams()
    const [data, setData] = useState(monthData(Number(params.year), Number(params.month)))
    useEffect(()=>{
        postg("eventsByMonth", {
            ...getStorage(),
            courseName: params.courseName,
            year: params.year,
            month: params.month
        }).then((json: events)=>{
            console.log(json)
        })
    }, [refresh.state])
    return (
        <>
        </>
    )
}