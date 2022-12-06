import { FC, FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDateFormat } from "../api/dateformat";
import { useAuth, useLogout } from "../api/logout";
import { postg } from "../api/postg";
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
            info: getForm(inputs)
        })
        postg('updateInfo', {
            ...getStorage(),
            info: getForm(inputs)
        }).then((json: updateInfo)=>{
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
            <button onClick={logout}>ログアウト</button>
            <button onClick={toInfo}>戻る</button>
            <form onSubmit={onSubmit}>
                {/* {
                    image.avatar.element
                }
                <label htmlFor={image.avatar.name}>
                    <img src={getImageUrl()} alt="AVATAR" />
                </label> */}
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
        </>
    )
}