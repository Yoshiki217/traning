import { createContext, FC, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getStorage } from "../api/storage";
import { RefreshContext } from "./Slash";

export const MessageContext = createContext({
    value: "",
    setValue: (next: string)=>{}
})

export const Top : FC = () => {
    const gate = useNavigate()
    const refresh = useContext(RefreshContext)
    const [value, setValue] = useState("")
    const context = {
        value: value,
        setValue: (next: string)=>{setValue(next)}
    }
    useEffect(()=>{
        if(getStorage().accessId!=undefined){
            gate('../account')
        }
    }, [refresh])
    return (
        <>
            <MessageContext.Provider value={context}>
                <Outlet/>
            </MessageContext.Provider>
        </>
    )
}
