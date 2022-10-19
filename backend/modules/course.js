const checkAuth = require('./account').checkAuth;
exports.createCourse = (accessId, sign, courseName, subAccountName) => {
    let json = {
        status: false,
        errormessage: '',
        subAccountInfo: {
            accountName: '',
            userName: '',
            email: '',
            birthday: '',
            phone: '',
            sex: 0,
            address: '',
        }
    }
    let auth = checkAuth(accessId, sign)
    //auth.auth==falseしたら中断
    //accessアカウントは先生チェック、そうでなければ中断
    //新しい生徒アカウント作成、コース作成、生徒情報(デフォールト)を入れてstatus: trueにして返す
    return {...json, ...auth}
}

exports.removeCourse = (accessId, sign, courseName) => {
    let json = {
        status: false,
        errormessage: ''
    }
    let auth = checkAuth(accessId, sign)
    //auth.auth==falseしたら中断
    //accessアカウントは先生チェック、そうでなければ中断
    //該当のコースおよび生徒アカウント削除、status: trueにして返す
    //該当のコース存在しなければerrormessageにメッセジー入れて返す
    return {...json, ...auth}
}

exports.changeCourseName = (accessId, sign, beforeCourseName, afterCourseName) => {
    let json = {
        status: false,
        errormessage: '',
        courseName: ''
    }
    let auth = checkAuth(accessId, sign)
    //auth.auth==falseしたら中断
    //accessアカウントは先生チェック、そうでなければ中断
    //該当コース名を更新、新しいコース名を入れて、status: trueにして返す
    //該当コース存在しない、既に存在したコース名に更新したらerrormessageにメッセジー入れて返す
    return {...json, ...auth}
}