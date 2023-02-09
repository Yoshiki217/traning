import {FC, useContext, useEffect, useState} from "react"
import { useNavigate, useParams } from "react-router-dom"
import { calendarData, monthData } from "../api/dateformat"
import { AccountContext } from "./Account"
import { eventsByMonthContext } from "./YM"
export const YMIndex : FC = () => {
    const events = useContext(eventsByMonthContext)
    const account = useContext(AccountContext)
    const params = useParams()
    const gate = useNavigate()
    const [data, setData] = useState(calendarData(Number(params.year), Number(params.month)))
    const toCreateEvent = (date: number) =>{
        const d = date<10? `0${date}`: `${date}`
        gate(`../createEvent?date=${params.year}-${params.month}-${d}`)
    }
    const toEvent = (eventId: number)=>{
        gate(`../event/${eventId}`)
    }
    const nextMonth = ()=>{
        if(params.month=="12"){
            gate(`../${Number(params.year)+1}/01`)
        } else {
            gate(`../${params.year}/${Number(params.month)<9? `0${Number(params.month)+1}`: Number(params.month)+1}`)
        }
    }
    const previousMonth = () => {
        if(params.month=="01"){
            gate(`../${Number(params.year)-1}/12`)
        } else {
            gate(`../${params.year}/${Number(params.month)<11? `0${Number(params.month)-1}`: Number(params.month)-1}`)
        }
    }
    return (
        <>
            <div className="container mx-auto mt-7">
            <div className="wrapper bg-white rounded shadow w-full ">
                <div className="header flex justify-between border-b p-2">
                <div className="buttons">
                    <button className="p-1" onClick={previousMonth}>
                        <svg width="1em" fill="gray" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-left-circle"  xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path fillRule="evenodd" d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z"/>
                        <path fillRule="evenodd" d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z"/>
                        </svg>
                    </button>
                    <button className="p-1" onClick={nextMonth}>
                        <svg width="1em" fill="gray" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right-circle"  xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path fillRule="evenodd" d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z"/>
                        <path fillRule="evenodd" d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                    </button>
                    <button>
                        <a className="inline-flex items-center w-full px-4 py-2 mt-1 text-base text-gray-900 transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-50" onClick={()=>{gate("../bodyparams")}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                            </svg>
                            <span className="ml-4">体重グラフに</span>
                        </a>
                    </button>
                </div>
                </div>
                <table className="w-full">
                <thead>
                    <tr>
                    <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                        <span className="xl:block lg:block md:block sm:block hidden">日曜日</span>
                        <span className="xl:hidden lg:hidden md:hidden sm:hidden block">日</span>
                    </th>
                    <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                        <span className="xl:block lg:block md:block sm:block hidden">月曜日</span>
                        <span className="xl:hidden lg:hidden md:hidden sm:hidden block">月</span>
                    </th>
                    <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                        <span className="xl:block lg:block md:block sm:block hidden">火曜日</span>
                        <span className="xl:hidden lg:hidden md:hidden sm:hidden block">火</span>
                    </th>
                    <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                        <span className="xl:block lg:block md:block sm:block hidden">水曜日</span>
                        <span className="xl:hidden lg:hidden md:hidden sm:hidden block">水</span>
                    </th>
                    <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                        <span className="xl:block lg:block md:block sm:block hidden">木曜日</span>
                        <span className="xl:hidden lg:hidden md:hidden sm:hidden block">木</span>
                    </th>
                    <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                        <span className="xl:block lg:block md:block sm:block hidden">金曜日</span>
                        <span className="xl:hidden lg:hidden md:hidden sm:hidden block">金</span>
                    </th>
                    <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                        <span className="xl:block lg:block md:block sm:block hidden">土曜日</span>
                        <span className="xl:hidden lg:hidden md:hidden sm:hidden block">土</span>
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((ds)=>
                        <tr className="text-center h-20" key={`${ds[0].date}-${ds[0].thisMonth}`}>
                            {
                                ds.map((d)=>
                                <td key={d.date} className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300 ">
                                    <div className="flex flex-col h-40 xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                                    <div className="top h-5 w-full">
                                        <span className="text-gray-500">{d.date}</span>
                                    </div>
                                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer">
                                        {
                                            d.thisMonth==0 ? events[`day${d.date}`].map((e)=>
                                            <div
                                            key={e.eventId}
                                            onClick={()=>{toEvent(e.eventId)}}
                                            className="event bg-purple-400 text-white rounded p-1 text-sm mb-1"
                                            >
                                            <span className="event-name">
                                                {e.eventName}
                                            </span>
                                            {/* <span className="time">
                                                {e.eventType.eventTypeName}
                                            </span> */}
                                            </div>
                                            ) : <></>
                                        }
                                        {
                                            d.thisMonth==0 && account.isMain?
                                            <div
                                            onClick={()=>{toCreateEvent(d.date)}}
                                            className="event bg-purple-400 text-white rounded p-1 text-sm mb-1"
                                            >
                                            <span className="event-name">
                                                +
                                            </span>
                                            </div>
                                            :<></>
                                        }
                                            
                                    </div>
                                    </div>
                                </td>)
                            }
                        </tr>)
                    }
                </tbody>
                </table>
            </div>
            </div>
        </>
    )
}