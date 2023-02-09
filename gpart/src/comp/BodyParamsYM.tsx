import { FC, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dateFormat, getDateFormat } from "../api/dateformat";
import { useAuth } from "../api/logout";
import { postg } from "../api/postg";
import { getStorage } from "../api/storage";
import { useInputs } from "../api/useInputs";

export const BodyParamsYM: FC = () => {
    const [rawData, setRawData] = useState<{
        date: string,
        weight: number | string
    }[]>([])
    
    const auth = useAuth()
    const params = useParams()
    const gate = useNavigate()
    const [inputs, setInputs] = useInputs({
        date: {
            name: "date",
            value: dateFormat(Number(params.year), Number(params.month))
        },
        weight: {
            name: "weight",
            value: "0"
        }
    })
    const getRawData = () => {
        postg("bodyParams", {
            ...getStorage(),
            courseName: params.courseName,
            year: params.year,
            month: params.month
        }).then((json: {
            auth: boolean,
            sign: string,
            status: boolean,
            errormessage: string,
            paramInfos: {
                weight: number,
                date: string
            }[]
        })=>{
            console.log(json)
            if(!auth(json)) return
            if(!json.status) return
            setRawData(json.paramInfos)
        })
    }
    useEffect(()=>{
        const canvas = document.getElementById("canvas_chart") as HTMLDivElement
        if(rawData.length>0){
            window.utilDraw(canvas, rawData)
        } else {
            canvas.innerHTML=""
        }
        setInputs({
            target: {
                name: "date",
                value: dateFormat(Number(params.year), Number(params.month))
            }
        })
    }, [rawData])
    const removeParam = (date: string) => {
        postg('removeBodyParams', {
            ...getStorage(),
            courseName: params.courseName,
            date: date
        }).then((json: {
            auth: boolean,
            sign: string,
            status: boolean,
            errormessage: string
        })=>{
            if(!auth(json)) return
            if(!json.status) return
            getRawData()
        })
    }
    const updateParam = (date: string, weight: number, reset: boolean) => {
        postg("updateBodyParams", {
            ...getStorage(),
            date: date,
            weight: weight,
            courseName: params.courseName,
            info: {
                date: date,
                weight: weight,
                height: 0
            }
        }).then((json: {
            auth: boolean,
            sign: string,
            status: boolean,
            errormessage: string,
        })=>{
            console.log(json)
            if(!auth(json)) return
            if(!json.status) return
            getRawData()
            if(reset){
                setInputs({
                    target: {
                        name: "date",
                        value: getDateFormat()
                    }
                })
                setInputs({
                    target: {
                        name: "weight",
                        value: "0"
                    }
                })
            }
        })
    }
    useEffect(()=>{
        getRawData()
    }, [params.year, params.month])
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
                        <a className="inline-flex items-center w-full px-4 py-2 mt-1 text-base text-gray-900 transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-50" onClick={()=>{gate('../../')}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                            </svg>
                            <span className="ml-4">種目に</span>
                        </a>
                    </button>
                </div>
                </div>
            <div>
                <input type="date" name={inputs.date.name} value={inputs.date.value} onChange={setInputs} />
                <input type="number" name={inputs.weight.name} value={inputs.weight.value} onChange={setInputs} />
                <button type="button" onClick={()=>{updateParam(String(inputs.date.value), Number(inputs.weight.value), true)}}>追加/変更</button>
            </div>
            <div id="canvas_chart"></div>
            {
                rawData.map(r=>
                <div key={r.date}>
                    <span>{r.date}</span>:
                    <span>{r.weight}</span>
                    <button onClick={()=>{removeParam(r.date)}}>削除</button>
                </div>)
            }
            
            </div>
            </div>
        </>
    )
}