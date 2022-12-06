import { FC, useContext, useEffect } from "react";
import { json } from "stream/consumers";
import { getPublic, postg } from "../api/postg";
import { useLogout } from "../api/logout";
import { getStorage } from "../api/storage";
import { AccountContext } from "./Account";
import { useNavigate } from "react-router-dom";
import { CourseName } from "./CourseName";

export const AccountIndex : FC = () => {
    const context = useContext(AccountContext)
    const logout = useLogout()
    const gate = useNavigate()
    const toInfo = () => {
        gate('info')
    }
    const toCreateCourse = () => {
        gate('createCourse')
    }
    const onCourseclick = (courseName: string) => {
        gate(`course/${courseName}`)
    }
    return (

        // <>  
        //     <img src={getPublic(context.avatar)} alt="" className="mask mask-circle" />
        //     <h1>{context.userName}</h1>
        //     <h2>{context.accountName}</h2>
        //     {
        //         context.isMain ?
        //         <button onClick={toCreateCourse}>コース作成</button>
        //         :
        //         <></>
        //     }
        //     <button onClick={logout}>ログアウト</button>
        //     <button onClick={toInfo}>情報</button>
        //     {
        //         context.courses.map(course=><h1 key={course.courseName} onClick={()=>onCourseclick(course.courseName)}>{course.courseName}</h1>)
        //     }
        // </>
        <div className="flex justify-start">
            <div>
            <ul className="menu bg-base-100 w-56 p-2 rounded-box">
            <li>
                <a>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                顧客選択
                </a>
            </li>
            <li>
                <a>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                トレーニング
                </a>
            </li>
            <li>
                <a>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                食事
                </a>
            </li>
            <li>
                <a>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                グラフ
                </a>
            </li>
            <li>
                <a>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                チャット
                </a>
            </li>
        </ul>
        {/* メニューバー */}
        <br></br>
        <div className="dropdown dropdown-hover p-2">
            <div className="relative  bg-sakura-50 px-6 py-5 rounded-box">
            <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                <span>MX</span>
                </div>
                <p className="pl-5 pt-1">ID:123456789</p>
            </div>
            </div>
                        
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
            </ul>
        </div>
        </div>

        <div>

        </div>
            <div className="dropdown dropdown-hover p-2">
            <div className="relative  bg-sakura-50 px-6 py-5 rounded-box">
                <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                    <span>{context.accountName}</span>
                </div>
                <p className="pl-5 pt-1">{context.userName}</p>
                </div>
            </div>

        </div>
    </div>


    )
}