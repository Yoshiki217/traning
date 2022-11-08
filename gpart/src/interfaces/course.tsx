export interface createCourse {
    auth: boolean,
    sign: string
    status: boolean,
    errormessage: string
    subaccount: {
        accountName: string,
        userName: string,
        email: string,
        birthday: string,
        phone: string,
        sex: number,
        address: string,
    }
}

export interface removeCourse {
    auth: boolean,
    sign: string
    status: boolean,
    errormessage: string
}

export interface changeCourseName {
    auth: boolean,
    sign: string
    status: boolean,
    errormessage: string,
    courseName: string
}