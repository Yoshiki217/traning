export interface checkAuth {
    auth: boolean,
    sign: string
}

export interface register {
    status: boolean,
    erromessage: string
}

export interface login {
    status: boolean,
    errormessage: string,
    accessId: number,
    sign: string
}

export interface logout {
    status: boolean,
    errormessage: string
}

export interface account {
    status: boolean,
    errormessage: string,
    accountInfo: {
        accountName: string,
        userName: string,
        email: string,
        birthday: string,
        phone: string,
        sex: number,
        address: string,
        isMain: boolean,
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
    status: boolean,
    errormessage: string
}