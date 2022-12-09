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
        if(inputs.password.value!==inputs.confirmPassword.value){
            setMessage(<>パスワード一致していません</>)
            return
        }
        // console.log(getForm(inputs))
        // return
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
        // <
        //     <button onClick={toReturn}>戻る</button>
        //     <button onClick={toLogin}>ログインへ</button>
        //     <form onSubmit={onSubmit}>
        //         <input type="text" name={inputs.accountName.name} value={inputs.accountName.value} onChange={setInputs} />
        //         <input type="password" name={inputs.password.name} value={inputs.password.value} onChange={setInputs} />
        //         <input type="password" name={inputs.confirmPassword.name} value={inputs.confirmPassword.value} onChange={setInputs} />
        //         {
        //             message
        //         }
        //         <input type="submit" value="登録" />
        //     </form>

            <div className="bg-white py-8 sm:py-8 lg:py-12">
                <div className="max-w-screen-2xl px-8 md:px-20 mx-auto">

                    <div className="mb-10 md:mb-16">
                    <h2 className="text-blue-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">アカウント登録</h2>

                    </div>
                    <form className="max-w-screen-md grid sm:grid-cols-1 gap-4 mx-auto" onSubmit={onSubmit}>
                        <div className="sm:col-span-2">
                            <label htmlFor="userName" className="inline-block text-blue-800 text-sm sm:text-base mb-2">ニックネーム</label>
                            <input name="userName" onChange={setInputs}  className="w-full bg-gray-50 text-blue-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="accountName" className="inline-block text-blue-800 text-sm sm:text-base mb-2">アカウント名</label>
                            <input name="accountName" onChange={setInputs} className="w-full bg-gray-50 text-blue-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="sex" className="inline-block text-blue-800 text-sm sm:text-base mb-2">性別</label>
                            <div className="flex justify-around">
                                <div className="flex items-center mb-4">
                                    <input id="default-radio-1" onChange={setInputs} type="radio"  name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">女性</label>
                                </div>
                                <div className="flex items-center">
                                    <input checked id="default-radio-2" onChange={setInputs} type="radio" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">男性</label>
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="inline-block text-blue-800 text-sm sm:text-base mb-2">Eメール</label>
                            <input name="email" className="w-full bg-gray-50 text-blue-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="password" className="inline-block text-blue-800 text-sm sm:text-base mb-2">パスワード</label>
                            <input type="password" name="passwrod" onChange={setInputs} className="w-full bg-gray-50 text-blue-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
                        </div>


                        <div className="sm:col-span-2 flex justify-between items-center">
                            <button onClick={toLogin} className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">登録</button>

                            {/* <span className="text-gray-500 text-sm">*Required</span> */}
                            <button onClick={toReturn} className="inline-bloc bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"> 戻る </button>
                        </div>

                        {/* <p className="text-gray-400 text-xs">By signing up to our newsletter you agree to our <a href="#" className="hover:text-indigo-500 active:text-indigo-600 underline transition duration-100">Privacy Policy</a>.</p> */}
                    </form>
                </div>
                </div>
    )
}