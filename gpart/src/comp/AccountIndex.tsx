import { FC, useContext, useEffect } from "react";
import { json } from "stream/consumers";
import { getPublic, postg } from "../api/postg";
import { useLogout } from "../api/logout";
import { getStorage } from "../api/storage";
import { AccountContext } from "./Account";
import { useNavigate } from "react-router-dom";
import { CourseName } from "./CourseName";
import { EventTypesContext, EventTypeSelector } from "./EventTypeSelector";
import { useInputs } from "../api/useInputs";
import { monthData } from "../api/dateformat";
import { Info } from "./Info";

export const AccountIndex : FC = () => {
    const context = useContext(AccountContext)
    const logout = useLogout()
    const gate = useNavigate()
    const toInfo = () => {
        gate('info')
    }
    const toCreateCourse = () => {
        gate('createCourse')
    }
    const onCourseclick = (courseName: string) => {
        gate(`course/${courseName}`)
    }
    const eventTypes = useContext(EventTypesContext)
    const [inputs, setInputs] = useInputs({
        eventTypeId: {
            name: "eventTypeId",
            value: eventTypes.length > 0? eventTypes[0].eventTypeId : -1
        }
    })
    useEffect(()=>{
        gate('/account/user')
    })
    return (
        <>        
        </>
    )
}