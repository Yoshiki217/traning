import { FC, useState, useEffect, useContext, FormEvent } from "react";
import { getPublic, postg } from "../api/postg";
import { getStorage } from "../api/storage";
import { chatHistory, chatInbox } from "../interfaces/account";
import { AccountContext } from "./Account";
import SimpleBarReact from 'simplebar-react'
import { useInputs } from "../api/useInputs";
import { useAuth } from "../api/logout";

export const ChatOver: FC = () => {
    const accountInfo = useContext(AccountContext)
    
    const auth = useAuth()
    const [text, setText] = useState<{
        chatId: number,
        accountInfo: {
            userName: string,
            avatar: string
        },
        chatText: string
    }[]>([])

    const [inputs, setInputs] = useInputs({
        text: {
            name: "text",
            value: ""
        }
    })

    const [courseName, setCourseName] = useState<string>("")

    const insertText = (json: chatHistory) => {
        if(!auth(json)) return
        if(!json.status){
            return
        }
        setText(json.chats)
    }

    const getTextHistory = () => {
        console.log("history")
        postg("chatHistory", {
            ...getStorage(),
            courseName: courseName,
            limit: text.length+7
        }).then((json: chatHistory)=>{
            console.log(json)
            insertText(json)
        })
    }
    const getTextRealtime = () => {
        if(text.length>0){
            postg("chatRealtime", {
                ...getStorage(),
                courseName: courseName,
                chatId: text[0].chatId
            }).then((json: chatHistory)=>{
                console.log(json)
                insertText(json)
            })
        }
    }
    useEffect(()=>{
        if(courseName!=""){
            getTextHistory()
        }
    }, [courseName])

    useEffect(()=>{
        window.setInterval(()=>{
            if(courseName!=""){
                getTextRealtime()
            }
        }, 1000)
    }, [courseName, text])

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(courseName!=""){
            postg('chatInbox', {
                ...getStorage(),
                courseName: courseName,
                text: inputs.text.value
            }).then((json: chatInbox)=>{
                console.log(json)
                getTextRealtime()
            })
        }
    }
    return (
        <>
            <div className="shadow-lg rounded-lg"> 
                <div className="flex flex-row h-1000 justify-between bg-white">
                    <div className="flex flex-col w-2/5 h-1000 border-r-2 overflow-y-auto">
                    {
                        accountInfo.courses?.map(course=>
                        <div key={course.courseName} onClick={()=>{setCourseName(course.courseName)}} className={"flex flex-row py-4 px-2 items-center border-b-2" + (course.courseName == courseName ? " border-l-4 border-blue-400":"")}>
                            <div className="w-1/4">
                                <img src={getPublic(course.subAccountInfo.avatar)} className="object-cover h-12 w-12 rounded-full" alt=""/>
                            </div>
                            <div className="w-full">
                                <div className="text-lg font-semibold">{course.subAccountInfo.userName!="" ? course.subAccountInfo.userName : course.subAccountInfo.accountName}</div>
                                <span className="text-gray-500">{course.courseName}</span>
                            </div>
                        </div>)
                    }
                    </div>
                    <div className="w-full px-5 h-1000 flex flex-col justify-between">
                        <div className="flex flex-col mt-5">
                            {
                                text.map(t=>
                                <div key={t.chatId}>
                                    {t.chatText}
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={onSubmit}>
                <input type="text" name={inputs.text.name} value={inputs.text.value} onChange={setInputs}/>
                <button>send</button>
            </form>
        </>
    )
}