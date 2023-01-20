import { FC, FormEvent, useContext, useState } from "react"
import { postg } from "../api/postg"
import { getStorage } from "../api/storage"
import { noneEmpty, useInputs } from "../api/useInputs"
import { AccountContext } from "./Account"
import {passwordChange} from "../interfaces/account"
import { useAuth } from "../api/logout"
import { useNavigate } from "react-router-dom"

export const passwordChangeForm = {
    password: {
        name: "password",
        value: ""
    },
    confirmPassword: {
        name: "confirmPassword",
        value: ""
    }
}

export const PasswordChange: FC = () => {
    const auth = useAuth()
    const accountInfo = useContext(AccountContext)
    const [inputs, setInputs] = useInputs(
        passwordChangeForm
    )
    const [message, setMessage] = useState('')
    const gate = useNavigate()
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(!noneEmpty(inputs)){
            console.log("none inputs")
            return
        }
        if(inputs["password"].value != inputs["confirmPassword"].value){
            console.log("pass not same")
            return
        }
        postg(
            "passwordChange",
            {
                ...getStorage(),
                password: inputs.password.value
            }
        ).then((json: passwordChange)=>{
            console.log(json)
            if(!auth(json)) return
            if(!json.status){
                setMessage(json.errormessage)
                return

            }
            gate("/account")
        })
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                {
                    message
                }
                <input type="password" name={inputs.password.name} value={inputs.password.value} onChange={setInputs} />
                <input type="password" name={inputs.confirmPassword.name} value={inputs.confirmPassword.value} onChange={setInputs} />
                <input type="submit" value={"更新"}/>
            </form>
        </>
    )
}