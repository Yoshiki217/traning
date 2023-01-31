import { FC, FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postg } from "../api/postg";
import { getForm, useInputs } from "../api/useInputs";
import { register } from "../interfaces/account";
import { MessageContext } from "./Top";
import Header from "./Header";
import { Message } from "./Message";

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
    const messageContext = useContext(MessageContext)
    const [inputs, setInputs] = useInputs(registerForm)
    const [message, setMessage] = useState("")
    const toReturn = () => {
        gate('../')
    }
    const toLogin = () => {
        gate('../login')
    }
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        //check password same
        if(inputs.password.value!==inputs.confirmPassword.value){
            setMessage("パスワードは一致していません")
            return
        }
        postg('register', getForm(inputs))
        .then((json: register)=>{
            if(json.status){
                messageContext.setValue("登録完了しました！！！")
                gate("../login")
            } else {
                setMessage(json.errormessage)
            }
        })
    }
    return (
        <>
        {
            Header([
                {
                    label: "Log In",
                    url: "/top/login"
                }
            ])
        }
            <div className="bg-white py-8 sm:py-8 lg:py-12">
                <div className="max-w-screen-2xl px-8 md:px-20 mx-auto">

                    <div className="mb-10 md:mb-16">
                    <h2 className="text-blue-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">アカウント登録</h2>
                    

                    </div>
                    <form className="max-w-screen-md grid sm:grid-cols-1 gap-4 mx-auto" onSubmit={onSubmit}>
                        <div className="sm:col-span-2">
                            <label htmlFor="accountName" className="inline-block text-blue-800 text-sm sm:text-base mb-2">アカウント名</label>
                            <input name="accountName" onChange={setInputs} className="w-full bg-gray-50 text-blue-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="password" className="inline-block text-blue-800 text-sm sm:text-base mb-2">パスワード</label>
                            <input type="password" name={inputs.password.name} onChange={setInputs} className="w-full bg-gray-50 text-blue-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="password" className="inline-block text-blue-800 text-sm sm:text-base mb-2">パスワード</label>
                            <input type="password" name={inputs.confirmPassword.name} onChange={setInputs} className="w-full bg-gray-50 text-blue-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
                        </div>
                        <Message message={message}/>
                        <div className="sm:col-span-2 flex justify-between items-center">
                            <button className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">登録</button>

                            {/* <span className="text-gray-500 text-sm">*Required</span> */}
                            <button onClick={toReturn} className="inline-bloc bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"> 戻る </button>
                        </div>

                        {/* <p className="text-gray-400 text-xs">By signing up to our newsletter you agree to our <a href="#" className="hover:text-indigo-500 active:text-indigo-600 underline transition duration-100">Privacy Policy</a>.</p> */}
                    </form>
                </div>
                </div>
        </>
    )
}