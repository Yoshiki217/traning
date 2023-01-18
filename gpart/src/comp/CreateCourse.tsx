import { FC, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useLogout } from "../api/logout";
import { postg } from "../api/postg";
import { getStorage } from "../api/storage";
import { getForm, useInputs } from "../api/useInputs";
import { createCourse } from "../interfaces/course";
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
    const [message, setMessage] = useState(<></>)
    const auth = useAuth()
    const logout = useLogout()
    const gate = useNavigate()
    const toAccount = () => {
        gate('/account')
    }
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(inputs.subAccountPassword.value!=inputs.subAccountPasswordConfirm.value){
            setMessage(<>パスワード一致していません</>)
            return
        }
        postg('createCourse', {
            ...getStorage(),
            ...getForm(inputs)
        }).then((json: createCourse)=>{
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
    return (
        <>
            {/* <button onClick={toAccount}>戻る</button>
            <form onSubmit={onSubmit}>
                <input type="text" name={inputs.courseName.name} value={inputs.courseName.value} onChange={setInputs} />
                <input type="text" name={inputs.subAccountName.name} value={inputs.subAccountName.value} onChange={setInputs} />
                <input type="password" name={inputs.subAccountPassword.name} value={inputs.subAccountPassword.value} onChange={setInputs} />
                <input type="password" name={inputs.subAccountPasswordConfirm.name} value={inputs.subAccountPasswordConfirm.value} onChange={setInputs} />
                {
                    message
                }
                <input type="submit" value="作成" />
            </form> */}
            <div className="px-10 py-4">
                <div className="h-10 w-10">
                    <div></div>
                        <form onSubmit={onSubmit}>
                            <section className="py-5 text-blue-50">
                                <div>
                                    <input type="text" name={inputs.course.name} className="text">a</input>
                                </div>
                            </section>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}