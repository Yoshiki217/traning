import { FC, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postg } from "../api/postg";
import { setStorage } from "../api/storage";
import { getForm, useInputs } from "../api/useInputs";
import { login } from "../interfaces/account";
import { RefreshContext } from "./Slash";

export const loginForm = {
    accountName: {
        name: 'accountName',
        value: ''
    },
    password: {
        name: 'password',
        value: ''
    }
}

export const Login : FC = () => {
    const gate = useNavigate()
    const context = useContext(RefreshContext)
    const [inputs, setInputs] = useInputs(loginForm)
    const [message, setMessage] = useState(<></>)
    const toReturn = () => {
        gate('../')
    }
    const toRegister = () => {
        gate('../register')
    }
    const onSubmit = (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        postg('login', getForm(inputs))
        .then((json: login)=>{
            console.log(json)
            if(json.status){
                setStorage(json)
                context.setState()
            } else {
                setMessage(<>{json.errormessage}</>)
            }
        })
    }
    return (
        <>
            <button onClick={toReturn}>戻る</button>
            <button onClick={toRegister}>登録へ</button>
            <form onSubmit={onSubmit}>
                <input type="text" name={inputs.accountName.name} value={inputs.accountName.value} onChange={setInputs}/>
                <input type="password" name={inputs.password.name} value={inputs.password.value} onChange={setInputs}/>
                {
                    message
                }
                <input type="submit" value="ログイン" />
            </form>
        </>
    )
}