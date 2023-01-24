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
        <div className="bg-gray-200 min-h-screen pt-2 font-mono my-16">
            <div className="container mx-auto">
                <div className="inputs w-full max-w-2xl p-6 mx-auto">
                    <h2 className="text-2xl text-gray-900">Password Change</h2>
                    <form className="mt-6 border-t border-gray-400 pt-4" onSubmit={onSubmit}>
                    <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full md:w-full px-3 mb-6'>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Password</label>
                            <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500'
                            type='password'  required
                            name={inputs.password.name} value={inputs.password.value} onChange={setInputs} />
                        </div>
                        <div className='w-full md:w-full px-3 mb-6'>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Confirm Password</label>
                            <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500'
                            type='password'  required
                            name={inputs.confirmPassword.name} value={inputs.confirmPassword.value} onChange={setInputs} />
                        </div>
                        <div className="flex justify-end">
                            <button className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3" type="submit">save changes</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
            
        </>
    )
}