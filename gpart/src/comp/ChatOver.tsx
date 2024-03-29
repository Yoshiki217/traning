import { FC, useState, useEffect, useContext, FormEvent } from "react";
import { getPublic, postg } from "../api/postg";
import { getStorage } from "../api/storage";
import { chatHistory, chatInbox } from "../interfaces/account";
import { AccountContext } from "./Account";
import { useInputs } from "../api/useInputs";
import { useAuth } from "../api/logout";
import { io } from "socket.io-client";

export const ChatOver: FC = () => {
    const accountInfo = useContext(AccountContext)
    const auth = useAuth()
    const [text, setText] = useState<{
        chatId: number,
        accountInfo: {
            userName: string,
            accountName: string
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
        console.log(text.length)
        postg("chatRealtime", {
            ...getStorage(),
            courseName: courseName,
            chatId: text[0]?.chatId
        }).then((json: chatHistory)=>{
            console.log(json)
            insertText(json)
        })
    }
    useEffect(()=>{
        if(courseName!=""){
            getTextHistory()
        }
    }, [courseName])

    useEffect(()=>{
        const socket = io('http://localhost:8081')
        socket.on('hello', ()=>{
            console.log("connnect ok: "+accountInfo.accountName)
        })
        socket.on(accountInfo.accountName, ()=>{
            console.log("on new message")
            getTextRealtime()
        })
        return () => {
            socket.disconnect()
        }
    }, [text])
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(courseName!=""){
            postg('chatInbox', {
                ...getStorage(),
                courseName: courseName,
                text: inputs.text.value
            }).then((json: chatInbox)=>{
                console.log(json)
                if(!auth(json)) return
                if(!json.status) return
                setInputs({
                    target: {
                        name: "text",
                        value: ""
                    }
                })
            })
        }
    }
    useEffect(()=>{
        if(!accountInfo.isMain){
            setCourseName(accountInfo.courses[0].courseName)
        }
    })
    useEffect(()=>{
        if(accountInfo.isMain && accountInfo.courses.length>0 ){
            setCourseName(accountInfo.courses[0].courseName)
        }
    }, [])
    return (
        <>

            <div className="shadow-lg rounded-lg h-screen"> 
                <div className="flex flex-row justify-between bg-white  ">
                    <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">

                    {
                        accountInfo.isMain?
                        <>
                            <div className="flex flex-col border-r-2 overflow-y-auto">
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
                        </>
                        :<></>
                    }
                    </div>
                    <div className="w-full px-2 flex flex-col justify-between">
                        <div className="flex flex-col overflow-y-auto">
                            {
                                text?.map(t=>
                                <div key={t.chatId}>
                                    {
                                        t.accountInfo.accountName == accountInfo.accountName?
                                        <div className="chat chat-end">
                                            <div className="chat-bubble">{t.chatText}</div>
                                            <div className="chat-image avatar">
                                                <div className="w-10 rounded-full">
                                                    <img src={getPublic(t.accountInfo.avatar)} />
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="chat chat-start">
                                            <div className="chat-image avatar">
                                                <div className="w-10 rounded-full">
                                                    <img src={getPublic(t.accountInfo.avatar)} />
                                                </div>
                                            </div>
                                            <div className="chat-bubble">{t.chatText}</div>
                                        </div>   
                                    }                                  
                                </div>)
                            }
                        </div>
                        <div className="fixed bottom-0 w-2/3" >
                            <form className="flex flex-row input-group" onSubmit={onSubmit}>
                                <input type="text" placeholder="テキストを入力してください" className="w-full input input-bordered input-info bg-white" name={inputs.text.name} value={inputs.text.value} onChange={setInputs}/>
                                <button className="btn btn-square btn-outline btn-info bg-white">send</button>
                            </form>
                        </div>

                    </div>
                    
                </div>
                
            </div>

        </>
    )
}