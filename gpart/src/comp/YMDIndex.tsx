import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../api/logout";
import { EventsContext } from "./YMD";

export const YMDIndex : FC = () => {
    const events = useContext(EventsContext)
    const gate = useNavigate()
    const logout = useLogout()
    const toAccount = () => {
        gate('/account')
    }
    const toCreateEvent = () => {
        gate('../createEvent')
    }
    const onEventClick = (eventId: number) => {
        gate(`../event/${eventId}`)
    }
    return (
        <>

        </>
    )
}