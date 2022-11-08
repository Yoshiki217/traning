import { createContext, FC, useContext, useEffect, useState } from "react";
import { postg } from "../api/postg";
import { getStorage } from "../api/storage";
import { RefreshContext } from "./Slash";
import {account} from "../interfaces/account";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../api/logout";
import { getDateFormat } from "../api/dateformat";

export type accountInfo = {
    accountName: string,
    userName: string,
    email: string,
    birthday: string,
    phone: string,
    sex: number,
    address: string,
    isMain: boolean,
    courses: {
        courseName: string,
        subAccountInfo: {
            accountName: string,
            userName: string,
            email: string,
            birthday: string,
            phone: string,
            sex: number,
            address: string,
        }
    }[]
}

export const AccountContext = createContext<accountInfo>({
    accountName: '',
    userName: '',
    email: '',
    birthday: getDateFormat(),
    phone: '',
    sex: 0,
    address: '',
    isMain: false,
    courses: []
})

export const Account : FC = () => {
    const context = useContext(AccountContext)
    const refresh = useContext(RefreshContext)
    const auth = useAuth()
    const [value, setValue] = useState(context)
    const [loaded, setLoaded] = useState(false)
    const gate = useNavigate()
    // const location = useLocation()
    useEffect(()=>{
        postg('account', getStorage())
        .then((json: account)=>{
            console.log(json)
            if(!auth(json)) return
            setValue(json.accountInfo)
            setLoaded(true)
            if(!json.status){
                // console.log('go')
                gate('update')
                return
            }
        })
    }, [refresh.state])
    return (
        <>
            {
                loaded ? 
                <AccountContext.Provider value={value}><Outlet/></AccountContext.Provider>   
                :
                <></>
            }
        </>
    )
}