import { ChangeEvent, FC, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dateFormat, formatToUrl, getDateFormat } from "../api/dateformat";
import { useLogout } from "../api/logout";
import { EventRefreshContext } from "./EventId";
import { EventsContext } from "./YMD";

export const YMDIndex : FC = () => {
    const events = useContext(EventsContext)
    const eventRefresh = useContext(EventRefreshContext)
    const params = useParams()
    const gate = useNavigate()
    const logout = useLogout()
    const toAccount = () => {
        gate('/account')
    }
    const toCreateEvent = () => {
        gate('../createEvent')
    }
    const onEventClick = (eventId: number) => {
        gate(`../event/${eventId}`)
    }
    const [calendar, setCalendar] = useState(dateFormat(Number(params.year), Number(params.month), Number(params.date)))
    const onCalendarChange = (eventChange : ChangeEvent<HTMLInputElement>) => {
        setCalendar(eventChange.target.value)
        gate(`../${formatToUrl(eventChange.target.value)}`)
        eventRefresh.setState()
    }
    return (
        <>
            <button onClick={toCreateEvent}>イベント作成</button>
            <button onClick={toAccount}>戻る</button>
            <input type="date" value={calendar} onChange={onCalendarChange}/>
            {
                events.map(event=><div key={event.eventId} onClick={()=>onEventClick(event.eventId)}>
                    <h2>{event.eventName}</h2>
                </div>)
            }
        </>
    )
}