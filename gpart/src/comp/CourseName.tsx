import { report } from "process";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { AccountContext } from "./Account";
import { RefreshContext } from "./Slash";

export const CourseContext = createContext({
    courseName: '',
    subAccountInfo: {
        accountName: '',
        userName: '',
        email: '',
        birthday: '',
        phone: '',
        sex: 0,
        address: '',
    }
})

export const CourseName : FC = () => {
    const refresh = useContext(RefreshContext)
    const account = useContext(AccountContext)
    const [load, setLoad] = useState(false)
    const context = useContext(CourseContext)
    const [value, setValue] = useState(context)
    const params = useParams()
    const gate = useNavigate()
    useEffect(()=>{
        const filted = account.courses.filter(course=>course.courseName==params.courseName)
        if(filted.length!=1){
            gate('/account')
            return
        }
        const course = filted[0]
        setValue(course)
        setLoad(true)
    }, [refresh.state, params.courseName])
    return (
        <>  
            {
                load ? 
                <CourseContext.Provider value={value}>
                    <Outlet/>
                </CourseContext.Provider>
                :
                <></>
            }
        </>
    )
}