import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../api/logout";
import { getPublic } from "../api/postg";
import { AccountContext } from "./Account";

export const Info : FC = () => {
    const context = useContext(AccountContext)
    const logout = useLogout()
    const gate = useNavigate()
    const toUpdate = () => {
        gate('/account/settings')
    }
    const toAccount = () => {
        gate('/account')
    }
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-2">
                            <div className="p-2 lg:w-1/3 md:w-1/2 w-full" onClick={()=>{toUpdate()}}>
                                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                                <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                                    src={getPublic(context.avatar)}/>
                                <div className="flex-grow">
                                    <h2 className="text-gray-900 title-font font-medium">{context.userName}</h2>
                                    {/* <p className="text-gray-500">{course.courseName}</p> */}
                                </div>
                                </div>
                            </div>
                    </div>
                </div>
            </section>
        </>
    )
}