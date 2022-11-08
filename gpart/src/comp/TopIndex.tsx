import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const TopIndex : FC = () => {
    const gate = useNavigate()
    const toRegister = () => {
        gate('register')
    }
    const toLogin = () => {
        gate('login')
    }
    return (
        <>  
            <button onClick={toRegister}>登録</button>
            <button onClick={toLogin}>ログイン</button>
        </>
    )
}