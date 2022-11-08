import { FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postg } from "../api/postg";
import { getForm, useInputs } from "../api/useInputs";
import { register } from "../interfaces/account";

export const registerForm = {
    accountName: {
        name: 'accountName',
        value: ''
    },
    password: {
        name: 'password',
        value: ''
    },
    confirmPassword: {
        name: 'confirmPassword',
        value: ''
    }
}

export const Register : FC = () => {
    const gate = useNavigate()
    const [inputs, setInputs] = useInputs(registerForm)
    const [message, setMessage] = useState(<></>)
    const toReturn = () => {
        gate('../')
    }
    const toLogin = () => {
        gate('../login')
    }
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        //check password same
        if(inputs.password.value!=inputs.confirmPassword.value){
            setMessage(<>パスワード一致していません</>)
            return
        }
        postg('register', getForm(inputs))
        .then((json: register)=>{
            console.log(json)
            if(json.status){
                setMessage(<>登録完了<Link to='../login'>ログインへ</Link></>)
            } else {
                setMessage(<>{json.errormessage}</>)
            }
        })
    }
    return (
        <>
            <button onClick={toReturn}>戻る</button>
            <button onClick={toLogin}>ログインへ</button>
            <form onSubmit={onSubmit}>
                <input type="text" name={inputs.accountName.name} value={inputs.accountName.value} onChange={setInputs} />
                <input type="password" name={inputs.password.name} value={inputs.password.value} onChange={setInputs} />
                <input type="password" name={inputs.confirmPassword.name} value={inputs.confirmPassword.value} onChange={setInputs} />
                {
                    message
                }
                <input type="submit" value="登録" />
            </form>
        </>
    )
}