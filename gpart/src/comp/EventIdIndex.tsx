import { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatToUrl, getDateFormat } from "../api/dateformat";
import { useAuth, useLogout } from "../api/logout";
import { postg } from "../api/postg";
import { getStorage } from "../api/storage";
import { logEvent, removeEvent } from "../interfaces/event";
import { AccountContext } from "./Account";
import { EventContext, EventRefreshContext } from "./EventId";
import { Message } from "./Message";

export const EventIdIndex : FC = () => {
    const [log, setLog] = useState('')
    const event = useContext(EventContext)
    const eventRefresh = useContext(EventRefreshContext)
    const account = useContext(AccountContext)
    const [message, setMessage] = useState("")
    const gate = useNavigate()
    const auth = useAuth()
    const logout = useLogout()
    const toCourseName = () => {
        gate(`../${formatToUrl(event.eventInfo.date)}`)
    }
    const toUpdate = () => {
        gate('update')
    }
    const removeEvent = () => {
        postg('removeEvent', {
            ...getStorage(),
            eventId: event.eventInfo.eventId
        }).then((json: removeEvent)=>{
            console.log(json)
            if(!auth(json)) return
            if(json.status){
                gate("../")
            }
        })
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
                setMessage(json.errormessage)
                return
            }
            eventRefresh.setState()
            setLog('')
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
        <div className="container">  
            <div className="py-6 sm:py-8 lg:py-12">
                <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
                    <div className="flex flex-col items-center gap-4 md:gap-6">
                        <h1>Menu</h1>
                            <div className="max-w-md text-gray-600 lg:text-lg text-center">Menu Name</div>
                            <h2>{event.eventInfo.eventName}</h2>
                            <div className="max-w-md text-gray-600 lg:text-lg text-center">Body Name</div>
                            <h2>{event.eventInfo.eventType.eventTypeName}</h2>
                    </div>
                </div>
            </div>
            
                <div className="py-6 px-4 md:px-8">
                    <div className="flex justify-center gap-4 md:gap-6">
                    {
                        account.isMain?
                        <>
                        <button onClick={toUpdate} className="btn">変更</button>
                        <button onClick={removeEvent} className="btn">削除</button>
                        </>
                        : <></>
                    }
                    <button onClick={()=>{gate(-1)}} className="btn">戻る</button>
                    </div>
                </div>
                
            <div className="bg-white py-6 sm:py-8 lg:py-12">
                <form onSubmit={onSubmit}>
                    <div className="max-w-screen-2xl px-6 md:px-8 mx-auto">
                        <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 rounded-lg gap-4 p-4 md:p-8">
                            <p>コメント</p>
                            <div>
                            
                                <input type="textarea" name="log" className="input input-bordered input-sm w-full max-w-xs" value={log} onChange={(e)=>setLog(e.target.value)}/>
                                <Message message={message} />
                            </div>
                        <input type="submit" value="送信" className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3" />
                        </div>
                    </div>
                </form>
            </div>
            <div className="">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>comment</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                        event.eventLogs.map(log=><tr key={id_supply()}>
                            <th>{log.logAccountUserName}</th>
                            <td>{log.logText}</td>
                        </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}