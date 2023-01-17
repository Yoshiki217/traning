import { createContext, FC, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../api/logout";
import { postg } from "../api/postg";
import { getStorage } from "../api/storage";
import { events, eventTypes } from "../interfaces/event";
import { refresh, RefreshContext } from "./Slash";

export const EventTypesContext = createContext<{
    eventTypeId: number,
    eventTypeName: string
}[]>([])

export const CreateEvent : FC = () => {
    
    return (
        <>
            {
                
                    <Outlet/>
                
            }
        </>
    )
}