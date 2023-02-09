import { FC, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useLogout } from "../api/logout";
import { postg } from "../api/postg";
import { getStorage } from "../api/storage";
import { getForm, useInputs } from "../api/useInputs";
import { createEventType, updateEvent } from "../interfaces/event";
import { EventContext } from "./EventId";
import { EventTypeSelector } from "./EventTypeSelector";
import { Message } from "./Message";
import { RefreshContext } from "./Slash";

export const EventUpdateIndex : FC = () => {
    const refresh = useContext(RefreshContext)
    const event = useContext(EventContext)
    const [createEventTypeMessage, setCreateEventTypeMessage] = useState(<></>)
    const [inputs, setInputs] = useInputs({
        eventName: {
            name: 'eventName',
            value: event.eventInfo.eventName
        },
        eventTypeId: {
            name: 'eventTypeId',
            value: event.eventInfo.eventType.eventTypeId
        },
        eventWeightAmount: {
            name: 'eventWeightAmount',
            value: `${event.eventInfo.eventWeight.amount}`
        },
        eventWeightUnit: {
            name: 'eventWeightUnit',
            value: event.eventInfo.eventWeight.unit
        },
        eventTimesAmount: {
            name: 'eventTimesAmount',
            value: `${event.eventInfo.eventTimes.amount}`
        },
        eventTimesUnit: {
            name: 'eventTimesUnit',
            value: event.eventInfo.eventTimes.unit
        },
        date: {
            name: 'date',
            value: event.eventInfo.date
        }
    })
    const [message, setMessage] = useState("")
    const logout = useLogout()
    const gate = useNavigate()
    const toEvent = () => {
        gate('../')
    }
    const auth = useAuth()
    const onSubmit = (formEvent: FormEvent<HTMLFormElement>) => {
        formEvent.preventDefault()
        postg('updateEvent', {
            ...getStorage(),
            ...getForm(inputs),
            eventId: event.eventInfo.eventId,
            info: {
                ...getForm(inputs),
                eventId: event.eventInfo.eventId,
                eventWeight: {
                    amount: inputs.eventWeightAmount.value,
                    unit: inputs.eventWeigthUni
                },
                eventTimes: {
                    amount: inputs.eventTimesAmount.value,
                    unit: inputs.eventTimesUnit.value
                }
            }
        }).then((json: updateEvent)=>{
            console.log(json)
            if(!auth(json)) return
            if(!json.status){
                setMessage(json.errormessage)
                return
            }
            gate(`../`)
            refresh.setState()
        })
    }
    return (
        <>  
        <div className="bg-gray-200 min-h-screen pt-2 font-mono my-6">
            <div className="container mx-auto">
                <div className="inputs w-full max-w-2xl p-6 mx-auto">
                <button className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3" onClick={()=>{gate(-1)}}>戻る</button>
                    <h2 className="text-2xl text-gray-900">種類更新</h2>
                    <form className="mt-6 border-t border-gray-400 pt-4" onSubmit={onSubmit}>
                    <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full md:w-full px-3 mb-6'>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>種類名</label>
                            <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500'
                            type='text'  required
                            name={inputs.eventName.name} value={inputs.eventName.value} onChange={setInputs} />
                        </div>
                        <div>
                            {
                                createEventTypeMessage
                            }
                            <EventTypeSelector inputs={inputs} setInputs={setInputs}/>
                        </div>
                        <div className='w-full md:w-full px-3 mb-6'>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>重量数</label>
                            <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500'
                            type='number'  required
                            name={inputs.eventWeightAmount.name} value={inputs.eventWeightAmount.value} onChange={setInputs} />
                        </div>
                        <div className='w-full md:w-full px-3 mb-6'>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>重量単位</label>
                            <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500'
                            type='text'  required
                            name={inputs.eventWeightUnit.name} value={inputs.eventWeightUnit.value} onChange={setInputs} />
                        </div>
                        <div className='w-full md:w-full px-3 mb-6'>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>時間数</label>
                            <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500'
                            type='number'  required
                            name={inputs.eventTimesAmount.name} value={inputs.eventTimesAmount.value} onChange={setInputs} />
                        </div>
                        <div className='w-full md:w-full px-3 mb-6'>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>時間単位</label>
                            <select className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500'
                            required
                            name={inputs.eventTimesUnit.name} value={inputs.eventTimesUnit.value} onChange={setInputs}>
                                <option value="時">時</option>
                                <option value="分">分</option>
                                <option value="秒">秒</option>
                            </select>
                        </div>
                        <div className='w-full md:w-1/2 px-3 mb-6'>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >日付</label>
                            <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500'
                            type='date'  required
                            name={inputs.date.name} value={inputs.date.value} onChange={setInputs} />
                        </div>
                        <Message message={message}/>
                        <div className="flex justify-end">
                            <button className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3" type="submit">更新</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}