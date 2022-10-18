export interface createCourse {
    status: Boolean,
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
    status: boolean,
    errormessage: string
}

export interface changeCourseName {
    status: boolean,
    errormessage: string,
    courseName: string
}