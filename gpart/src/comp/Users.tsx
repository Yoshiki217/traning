import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useLogout } from "../api/logout"
import { AccountContext } from "./Account"
import {getPublic} from "../api/postg"

export const Users = () =>{
    const context = useContext(AccountContext)
    const logout = useLogout()
    const gate = useNavigate()
    const toInfo = () => {
        gate('info')
    }
    const toCreateCourse = () => {
        gate('../createCourse')
    }
    const onCourseclick = (courseName: string) => {
        gate(`../course/${courseName}`)
    }

  return (
    <section className="text-gray-600 body-font">
            <div>
                <button onClick={toCreateCourse}>Create Course</button>
            </div>
            <div className="container px-5 py-24 mx-auto">
                {
                    context.courses?.map(course=>
                        <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={course.courseName} onClick={()=>{onCourseclick(course.courseName)}}>
                            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                            src={getPublic(course.subAccountInfo.avatar)} />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">{course.courseName}</h2>
                                <p className="text-gray-500">CTO</p>
                            </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </section>
  )
}