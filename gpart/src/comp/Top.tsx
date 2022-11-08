import { FC, useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getStorage } from "../api/storage";
import { RefreshContext } from "./Slash";

export const Top : FC = () => {
    const gate = useNavigate()
    const context = useContext(RefreshContext)
    useEffect(()=>{
        if(getStorage().accessId!=undefined){
            gate('../account')
        }
    }, [context])
    return (
        <>
            <Outlet/>
        </>
    )
}
