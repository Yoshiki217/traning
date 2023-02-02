import { FC, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { dateUrl } from "../api/dateformat";

export const BodyParams: FC = () => {
    const gate = useNavigate()
    useEffect(()=>{
        const dateObject = new Date()
        const url = dateUrl(dateObject.getFullYear(), dateObject.getMonth()+1, dateObject.getDate())
        gate(`${url.year}/${url.month}`)
    })
    return (
        <></>
    )
}