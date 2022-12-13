import { FC, FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDateFormat } from "../api/dateformat";
import { useAuth, useLogout } from "../api/logout";
import { postg } from "../api/postg";
import { imagePreview } from "../api/preview";
import { getStorage } from "../api/storage";
import { getForm, useInputs, useUpload } from "../api/useInputs";
import { updateInfo } from "../interfaces/account";
import { AccountContext } from "./Account";
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
        value: 0
    },
    address: {
        name: 'address',
        value: ''
    }
}

export const Update : FC = () => {
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
                value: accountInfo.sex
            },
            address: {
                name: 'address',
                value: accountInfo.address
            }
        }
    )

    const [image, setImage] = useUpload(['avatar'])
    const avatarPreview = imagePreview('avatar', image)
    const gate = useNavigate()
    const [message, setMessage] = useState(<></>)
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
        postg('updateInfo', {
            ...getStorage(),
            info: getForm(inputs)
        }, image).then((json: updateInfo)=>{
            console.log(json)
            if(!auth(json)) return
            if(!json.status){
                setMessage(<>{json.errormessage}</>)
                return
            }
            gate('/account')
            refresh.setState()
        })
    }
    const getImageUrl = () => {
        return image.avatar.file? URL.createObjectURL(image.avatar.file) : ''
    }
    return (
        <>  
            
            <button onClick={toInfo}>戻る</button>
            <form onSubmit={onSubmit}>
                <input type="file" name={image.avatar.name} id={image.avatar.name} style={{display: 'none'}} onChange={setImage} />

                <input type="text" name={inputs.userName.name} value={inputs.userName.value} onChange={setInputs}/>
                <input type="text" name={inputs.email.name} value={inputs.email.value} onChange={setInputs}/>
                <input type="date" name={inputs.birthday.name} value={inputs.birthday.value} onChange={setInputs}/>
                <input type="text" name={inputs.phone.name} value={inputs.phone.value} onChange={setInputs}/>
                <select name={inputs.sex.name} value={inputs.sex.value} onChange={setInputs}>
                    <option value="0">男</option>
                    <option value="1">女</option>
                    <option value="2">その他</option>
                </select>
                <input type="text" name={inputs.address.name} value={inputs.address.value} onChange={setInputs}/>
                {
                    message
                }

                <input type="submit" value="アップデート" />
            </form>
            <div className="static flex flex-row">
                <div className="inline-block" > 
                    <ul className="menu bg-base-100 w-56 p-4 rounded-box">
                        <li>
                            <a className="text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            顧客選択
                            </a>
                        </li>
                        <li>
                            <a className="text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            トレーニング
                            </a>
                        </li>
                        <li>
                            <a className="text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                            食事
                            </a>
                        </li>
                        <li>
                            <a className="text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                            グラフ
                            </a>
                        </li>
                        <li>
                            <a className="text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                            チャット
                            </a>
                        </li>
                    </ul>
                </div>
                

                <div className="dropdown dropdown-hover p-2">
                    <div className="static  bg-sakura-50 px-5 py-4 rounded-box">
                        <div className="avatar placeholder">
                            <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                                <span>                
                                    {
                                        avatarPreview
                                    }
                                </span>
                            </div>
                            <p className="pl-5 pt-1 text-black">ID:123456789</p>
                        </div>
                    </div>
                                
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a className="text-black">Item 1</a></li>
                    <li><a className="text-black">Item 2</a></li>
                    <li><button onClick={logout} className="text-black">ログアウト</button></li>
                    </ul>
                </div>

                <div className=""> 
                    <button className="text-black">アップデート</button>
                </div>
                
                
            </div>
            
        </>
    )
}