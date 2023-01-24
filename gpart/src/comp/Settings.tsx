
import { FC, FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDateFormat } from "../api/dateformat";
import { useAuth, useLogout } from "../api/logout";
import { postg } from "../api/postg";
import { imagePreview } from "../api/preview";
import { getStorage } from "../api/storage";
import { getForm, noneEmpty, useInputs, useUpload } from "../api/useInputs";
import { updateInfo } from "../interfaces/account";
import { AccountContext } from "./Account";
import { Message } from "./Message";
import { RefreshContext } from "./Slash";

export const updateForm = {
    userName: {
        name: 'userName',
        value: ''
    },
    email: {
        name: 'email',
        value: ''
    },
    birthday: {
        name: 'birthday',
        value: getDateFormat()
    },
    phone: {
        name: 'phone',
        value: ''
    },
    sex: {
        name: 'sex',
        value: "2"
    },
    address: {
        name: 'address',
        value: ''
    },
    avatar: {
        name: "avatar",
        value: "default_avatar.png"
    }
}   

export const Settings = () => {

  const refresh = useContext(RefreshContext)
    const accountInfo = useContext(AccountContext)
    const [inputs, setInputs] = useInputs(
        {
            userName: {
                name: 'userName',
                value: accountInfo.userName
            },
            email: {
                name: 'email',
                value: accountInfo.email
            },
            birthday: {
                name: 'birthday',
                value: accountInfo.birthday
            },
            phone: {
                name: 'phone',
                value: accountInfo.phone
            },
            sex: {
                name: 'sex',
                value: `${accountInfo.sex}`
            },
            address: {
                name: 'address',
                value: accountInfo.address
            },
            avatar: {
                name: "avatar",
                value: accountInfo.avatar
            }
        }
    )

    const [image, setImage] = useUpload([{name: 'avatar', link: accountInfo.avatar}])
    const avatarPreview = imagePreview('avatar', image)
    const gate = useNavigate()
    const [message, setMessage] = useState("")
    const auth = useAuth()
    const logout = useLogout()
    const toInfo = () => {
        gate('../info')
    }
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log({
            ...getStorage(),
            info: getForm(inputs),
            image
        })
        if(!noneEmpty(inputs)){
            return
        }
        postg('updateInfo', {
            ...getStorage(),
            ...getForm(inputs),
            info: getForm(inputs)
        }, image).then((json: updateInfo)=>{
            console.log(json)
            if(!auth(json)) return
            if(!json.status){
                setMessage(json.errormessage)
                return
            }
            gate('/account')
            refresh.setState()
        })
    }
    const toPasswordChange = ()=> {
        gate("/account/passwordChange")
    }

    const getImageUrl = () => {
        return image.avatar.file? URL.createObjectURL(image.avatar.file) : ''
    }

  return (
    <>
      <div className="bg-gray-200 min-h-screen pt-2 font-mono my-6">
                <div className="container mx-auto">
                    <div className="inputs w-full max-w-2xl p-6 mx-auto">
                        <h2 className="text-2xl text-gray-900">Account Setting</h2>
                        <form className="mt-6 border-t border-gray-400 pt-4" onSubmit={onSubmit}>
                            <div className='flex flex-wrap -mx-3 mb-6'>
                                <div className='w-full md:w-full px-3 mb-6'>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-text-1'>email address</label>
                                    <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none focus:border-gray-500' 
                                        id='grid-text-1' type='text' placeholder='Enter email'  required
                                        name={inputs.email.name} onChange={setInputs} value={inputs.email.value}/>
                                </div>
                                <div className='w-full md:w-full px-3 mb-6 '>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>password</label>
                                    <button onClick={toPasswordChange} className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md ">change your password</button>
                                </div>
                                <div className="personal w-full border-t border-gray-400 pt-4">
                                    <h2 className="text-2xl text-gray-900">Personal info:</h2>
                                    <div className='w-full md:w-full px-3 mb-6'>
                                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>user name</label>
                                        <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500'
                                        type='text'  required 
                                        value={inputs.userName.value} onChange={setInputs} name={inputs.userName.name} />
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className='w-full md:w-1/2 px-3 mb-6'>
                                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >birthday</label>
                                            <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500'
                                            type='date'  required
                                            value={inputs.birthday.value} onChange={setInputs} name={inputs.birthday.name} />
                                        </div>
                                    </div>
                                    <div className='w-full md:w-full px-3 mb-6'>
                                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>phone</label>
                                        <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500'
                                        type='text'  required
                                        name={inputs.phone.name} onChange={setInputs} value={inputs.phone.value}/>
                                    </div>
                                    <div className='w-full md:w-full px-3 mb-6'>
                                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>address</label>
                                        <input className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500'
                                        type='text'  required
                                        name={inputs.address.name} onChange={setInputs} value={inputs.address.value}/>
                                    </div>
                                    <div className='w-full md:w-full px-3 mb-6'>
                                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>sex</label>
                                        <select className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500'
                                        name={inputs.sex.name} value={inputs.sex.value} onChange={setInputs} >
                                            <option value={0}>男</option>
                                            <option value={1}>女</option>
                                            <option value={2}>他</option>
                                        </select>
                                    </div>
                                    <div className='w-full md:w-full px-3 mb-6'>
                                        <input type="file" id={image.avatar.name} name={image.avatar.name} onChange={setImage}/>
                                        {
                                            avatarPreview
                                        }
                                    </div>
                                    <Message message={message} />
                                    <div className="flex justify-end">
                                        <button className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3" type="submit">save changes</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    </>
  )
}

