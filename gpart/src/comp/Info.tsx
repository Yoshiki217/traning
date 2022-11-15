import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../api/logout";
import { AccountContext } from "./Account";

export const Info : FC = () => {
    const context = useContext(AccountContext)
    const logout = useLogout()
    const gate = useNavigate()
    const toUpdate = () => {
        gate('../update')
    }
    const toAccount = () => {
        gate('/account')
    }
    return (
        <>
            <button onClick={logout}>ログアウト</button>
            <button onClick={toAccount}>戻る</button>
            <button onClick={toUpdate}>アップデート</button>
            {context.userName}<br/>
            {context.address}<br/>
            {context.birthday}<br/>
        </>
    )
}