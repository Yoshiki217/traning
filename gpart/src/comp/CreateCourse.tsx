import { FC, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useLogout } from "../api/logout";
import { postg } from "../api/postg";
import { getStorage } from "../api/storage";
import { getForm, useInputs } from "../api/useInputs";
import { createCourse } from "../interfaces/course";
import { Message } from "./Message";
import { RefreshContext } from "./Slash";

export const CreateCourse : FC = () => {
    const refresh = useContext(RefreshContext)
    const [inputs, setInputs] = useInputs(
        {
            courseName: {
                name: 'courseName',
                value: ''
            },
            subAccountName: {
                name: 'subAccountName',
                value: ''
            },
            subAccountPassword: {
                name: 'subAccountPassword',
                value: ''
            },
            subAccountPasswordConfirm: {
                name: 'subAccountPasswordConfirm',
                value: ''
            }
        }
    )
    const [message, setMessage] = useState("")
    const auth = useAuth()
    const logout = useLogout()
    const gate = useNavigate()
    const toAccount = () => {
        gate('/account')
    }
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(inputs.subAccountPassword.value!=inputs.subAccountPasswordConfirm.value){
            setMessage("パスワード一致していません")
            return
        }
        postg('createCourse', {
            ...getStorage(),
            ...getForm(inputs)
        }).then((json: createCourse)=>{
            console.log(json)
            if(!auth(json)) return
            if(!json.status){
                setMessage(json.errormessage)
                return
            }
            gate('/account/user')
            refresh.setState()
        })
    }
    return (
        <>
            <div className="bg-gray-200 min-h-screen pt-2 font-mono my-16">
                <div className="container mx-auto">
                    <div className="inputs w-full max-w-2xl p-6 mx-auto">
                        <h2 className="text-2xl text-gray-900">コース作成</h2>
                        <form className="mt-6 border-t border-gray-400 pt-4" onSubmit={onSubmit}>
                        <div className='flex flex-wrap -mx-3 mb-6'>
                            <div className='w-full md:w-full px-3 mb-6'>
                                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>コース名前</label>
                                <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500'
                                type='text'  required
                                name={inputs.courseName.name} value={inputs.courseName.value} onChange={setInputs} />
                            </div>
                            <div className='w-full md:w-full px-3 mb-6'>
                                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>顧客アカウント名</label>
                                <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500'
                                type='text'  required
                                name={inputs.subAccountName.name} value={inputs.subAccountName.value} onChange={setInputs} />
                            </div>
                            <div className='w-full md:w-full px-3 mb-6'>
                                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>顧客アカウントパスワード</label>
                                <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500'
                                type='password'  required
                                name={inputs.subAccountPassword.name} value={inputs.subAccountPassword.value} onChange={setInputs} />
                            </div>
                            <div className='w-full md:w-full px-3 mb-6'>
                                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>パスワード再入力</label>
                                <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500'
                                type='password'  required
                                name={inputs.subAccountPasswordConfirm.name} value={inputs.subAccountPasswordConfirm.value} onChange={setInputs} />
                            </div>
                            <Message message={message}/>
                            <div className="flex justify-end">
                                <button className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3" type="submit">作成</button>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}