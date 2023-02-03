import { FC, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDateFormat } from "../api/dateformat";
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
            value: getDateFormat()
        },
        weight: {
            name: "weight",
            value: "0"
        }
    })
    const getRawData = () => {
        postg("bodyParams", {
            ...getStorage(),
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
        if(rawData.length>0){
            const canvas = document.getElementById("canvas_chart") as HTMLDivElement
            window.utilDraw(canvas, rawData)
        }

    }, [rawData])
    const removeParam = (date: string) => {
        postg('removeBodyParams', {
            ...getStorage(),
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
            <div id="canvas_chart"></div>
            {
                rawData.map(r=>
                <div key={r.date}>
                    <span>{r.date}</span>:
                    <span>{r.weight}</span>
                    <button onClick={()=>{removeParam(r.date)}}>削除</button>
                </div>)
            }
            <div>
                <input type="date" name={inputs.date.name} value={inputs.date.value} onChange={setInputs} />
                <input type="number" name={inputs.weight.name} value={inputs.weight.value} onChange={setInputs} />
                <button type="button" onClick={()=>{updateParam(String(inputs.date.value), Number(inputs.weight.value), true)}}>追加/変更</button>
            </div>
        </>
    )
}