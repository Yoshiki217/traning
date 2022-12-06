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
        <>  
            <img src={getPublic(context.avatar)} alt="" className="mask mask-circle" />
            <h1>{context.userName}</h1>
            <h2>{context.accountName}</h2>
            {
                context.isMain ?
                <button onClick={toCreateCourse}>コース作成</button>
                :
                <></>
            }
            <button onClick={logout}>ログアウト</button>
            <button onClick={toInfo}>情報</button>
            {
                context.courses.map(course=><h1 key={course.courseName} onClick={()=>onCourseclick(course.courseName)}>{course.courseName}</h1>)
            }
        </>
    )
}