import { createContext, FC, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export type refresh = {
    state: boolean
    setState : () => void
}

export const RefreshContext = createContext<refresh>({
    state: false,
    setState: ()=>{}
})

export const Slash : FC = () => {
    const [state, setState] = useState(false)
    const value : refresh = {state: state, setState : ()=>setState(prev=>!prev)}
    const location = useLocation()
    const gate = useNavigate()
    useEffect(()=>{
        if(location.pathname=='/'){
            gate('top')
        }
    })
    return (
        <>  
            <RefreshContext.Provider value={value}><Outlet/></RefreshContext.Provider>
        </>
    )
}