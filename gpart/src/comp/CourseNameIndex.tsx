import { FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dateUrl } from "../api/dateformat";
import { CourseContext } from "./CourseName";

export const CourseNameIndex : FC = () => {
    const gate = useNavigate()
    useEffect(()=>{
        const dateObject = new Date()
        const url = dateUrl(dateObject.getFullYear(), dateObject.getMonth()+1, dateObject.getDate())
        gate(`${url.year}/${url.month}`)
    })
    return (
        <>
        </>
    )
}