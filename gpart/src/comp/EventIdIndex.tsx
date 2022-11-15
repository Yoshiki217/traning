import { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatToUrl, getDateFormat } from "../api/dateformat";
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
    let id_supply_origin = 0;
    const id_supply = () => {
        id_supply_origin++;
        return id_supply_origin;
    }
    useEffect(()=>{
        id_supply_origin=0;
    })
    return (
        <>  
            <button onClick={logout}>ログアウト</button>
            <button onClick={toCourseName}>戻る</button>
            {
                event.eventLogs.map(log=><div key={id_supply()}>
                    <h2>{log.logAccountUserName} : {log.logText}</h2>
                </div>)
            }
            <form onSubmit={onSubmit}>
                <input type="textarea" name="log" value={log} onChange={(e)=>setLog(e.target.value)}/>
                {
                    message
                }
                <input type="submit" value="ログ" />
            </form>
        </>
    )
}