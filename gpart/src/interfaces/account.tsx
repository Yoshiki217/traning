export interface checkAuth {
    auth: boolean,
    sign: string
}

export interface register {
    status: boolean,
    errormessage: string
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
    auth: boolean,
    sign: string
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
        avatar: string,
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
                avatar: string,
            }
        }[]
    }
}

export interface updateInfo {
    auth: boolean,
    sign: string
    status: boolean,
    errormessage: string
}

export interface passwordChange {
    auth: boolean,
    sign: string
    status: boolean,
    errormessage: string
}

export interface chatInbox {
    auth: boolean,
    sign: string
    status: boolean,
    errormessage: string
}

export interface chatHistory {
    auth: boolean,
    sign: string
    status: boolean,
    errormessage: string,
    chats: {
        chatId: number,
        accountInfo: {
            userName: string,
            avatar: string
        },
        chatText: string
    }[]
}