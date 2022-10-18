export interface checkAuth {
    auth: Boolean,
    sign: string
}
export interface register {
    status: Boolean,
    erromessage: string
}
export interface login {
    status: Boolean,
    errormessage: string,
    accessId: number,
    sign: string,
    isMain: Boolean
}
export interface logout {
    status: Boolean,
    errormessage: string
}
//
export interface account {
    status: Boolean,
    errormessage: string,
    accountInfo: {
        accountName: string,
        userName: string,
        email: string,
        birthday: string,
        phone: string,
        sex: number,
        address: string,
        courses: {
            courseName: string,
            subAccountInfo: {
                accountName: string,
                userName: string,
                email: string,
                birthday: string,
                phone: string,
                sex: number,
                address: string,
            }
        }[]
    }
}
export interface updateInfo {
    status: Boolean,
    errormessage: string
}