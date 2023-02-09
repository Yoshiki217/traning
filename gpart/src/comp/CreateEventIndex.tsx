import { FC, FormEvent, useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formatToUrl, getDateFormat } from "../api/dateformat";
import { useAuth, useLogout } from "../api/logout";
import { postg } from "../api/postg";
import { getStorage } from "../api/storage";
import { getForm, useInputs } from "../api/useInputs";
import { createEvent, createEventType } from "../interfaces/event";
import { CourseContext } from "./CourseName";
import { EventTypeRefreshContext, EventTypesContext, EventTypeSelector } from "./EventTypeSelector";
import { RefreshContext } from "./Slash";

export const CreateEventIndex : FC = () => {
    const refresh = useContext(RefreshContext)
    const [req] = useSearchParams()
    const course = useContext(CourseContext)
    const eventTypes = useContext(EventTypesContext)
    const [eventTypeName, setEventTypeName] = useState('')
    const [createEventTypeMessage, setCreateEventTypeMessage] = useState(<></>)
    const [inputs, setInputs] = useInputs({
        eventName: {
            name: 'eventName',
            value: ''
        },
        eventTypeId: {
            name: 'eventTypeId',
            value: eventTypes.length > 0 ? eventTypes[0].eventTypeId : -1
        },
        eventWeightAmount: {
            name: 'eventWeightAmount',
            value: '0'
        },
        eventWeightUnit: {
            name: 'eventWeightUnit',
            value: ''
        },
        eventTimesAmount: {
            name: 'eventTimesAmount',
            value: '0'
        },
        eventTimesUnit: {
            name: 'eventTimesUnit',
            value: '時'
        },
        date: {
            name: 'date',
            value: req.has("date")? req.get("date")! : getDateFormat()
        }
    })
    const [message, setMessage] = useState(<></>)
    const logout = useLogout()
    const gate = useNavigate()
    const toAccount = () => {
        gate('/account')
    }
    const auth = useAuth()
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(inputs)
        postg('createEvent', {
            ...getStorage(),
            ...getForm(inputs),
            info: {
                ...getForm(inputs),
                courseName: course.courseName,
                eventWeight: {
                    amount: inputs.eventWeightAmount.value,
                    unit: inputs.eventWeightUnit.value
                },
                eventTimes: {
                    amount: inputs.eventTimesAmount.value,
                    unit: inputs.eventTimesUnit.value
                }
            }
        }).then((json: createEvent)=>{
            console.log(json)
            if(!auth(json)) return
            if(!json.status){
                setMessage(<>{json.errormessage}</>)
                return
            }
            gate(-1)
            refresh.setState()
        })
    }
    return (
        <>
        <div className="bg-gray-200 min-h-screen pt-2 font-mono my-16">
            <div className="container mx-auto">
                <div className="inputs w-full max-w-2xl p-6 mx-auto">
                    <button className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3" onClick={()=>{gate(-1)}}>戻る</button>
                    <h2 className="text-2xl text-gray-900">種目作成</h2>
                    <form className="mt-6 border-t border-gray-400 pt-4" onSubmit={onSubmit}>
                    <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full md:w-full px-3 mb-6'>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>種目名</label>
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
                        <div className="flex justify-end">
                            <button className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3" type="submit">作成</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}