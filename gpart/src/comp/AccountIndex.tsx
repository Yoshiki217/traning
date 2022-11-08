import { FC, useContext, useEffect } from "react";
import { json } from "stream/consumers";
import { postg } from "../api/postg";
import { useLogout } from "../api/logout";
import { getStorage } from "../api/storage";
import { AccountContext } from "./Account";
import { useNavigate } from "react-router-dom";

export const AccountIndex : FC = () => {
    const context = useContext(AccountContext)
    const logout = useLogout()
    const gate = useNavigate()
    const toInfo = () => {
        gate('info')
    }
    return (
        <>  
            <h1>{context.userName}</h1>
            <h2>{context.accountName}</h2>
            <button onClick={logout}>ログアウト</button>
            <button onClick={toInfo}>情報</button>
        </>
    )
}