import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { checkAuth } from "../interfaces/account"
import { postg } from "./postg"
import { getStorage } from "./storage"

export const useLogout = () => {
    const gate = useNavigate()
    return useCallback(()=>{
        return postg('logout', getStorage())
        .then(json=>{
            localStorage.clear()
            gate('/top/login')
        })
    }, [])
}

export const useAuth = () => {
    const logout = useLogout()
    return useCallback((json: checkAuth)=>{
        if(!json.auth){
            logout()
            return false
        }
        return true
    }, [])
}