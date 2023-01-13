const checkAuth = require('./account').checkAuth;
exports.createCourse = (accessId, sign, courseName, subAccountName, subAccountPassword, con) => {
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
    let auth = checkAuth(accessId, sign, con)
    //auth.auth==falseしたら中断
    //accessアカウントは先生チェック、そうでなければ中断
    //新しい生徒アカウント作成、コース作成、生徒情報(デフォールト)を入れてstatus: trueにして返す
    if(auth.auth){
        if(auth.isMain){
            let r_coureseName = con.query(`SELECT courseName FROM course 
                    WHERE courseName = "${courseName}" 
                    AND idSensei = ${auth.id} FOR UPDATE`)
            if(r_coureseName.length!=0){
                con.query("ROLLBACK")
                json.errormessage = `${courseName}のコース名は既に登録されました。`
            }
            else{
                let r_insert_into_account = con.query(`INSERT INTO account(accountName, password, idSensei) VALUES ("${subAccountName}", "${subAccountPassword}", ${auth.id})`)
                let idSeito = r_insert_into_account.insertId
                con.query(`INSERT INTO course(courseName, idSeito, idSensei) VALUES ("${courseName}",${idSeito}, ${auth.id})`)
                con.query("COMMIT")
                json.subAccountInfo.accountName = subAccountName
                json.status = true
            }
        } else {
            auth.auth=false
        }
    }
    return {...json, ...auth}
}

exports.removeCourse = (accessId, sign, courseName, con) => {
    let json = {
        status: false,
        errormessage: ''
    }
    let auth = checkAuth(accessId, sign, con)
    //auth.auth==falseしたら中断
    //accessアカウントは先生チェック、そうでなければ中断
    //該当のコースおよび生徒アカウント削除、status: trueにして返す
    //該当のコース存在しなければerrormessageにメッセジー入れて返す
    if(auth.auth){
        if(auth.isMain){
            let r_idSeito = con.query(`SELECT idSeito FROM course 
                    WHERE courseName = "${courseName}"
                    AND idSensei = ${auth.id} FOR UPDATE`)
            if(r_idSeito==0){
                json.errormessage = `${courseName}のコース名は見つからない又はまだ登録されません。`
                con.query("ROLLBACK")
            }
            else{
                con.query(`DELETE FROM account WHERE id = ${r_idSeito[0].idSeito}`)
                con.query("COMMIT")
                json.status = true
            }
        }
        else{
            json.errormessage = "アカウントが先生以外は操作できません。"
        }
        
    }
    return {...json, ...auth}
}

exports.changeCourseName = (accessId, sign, beforeCourseName, afterCourseName, con) => {
    let json = {
        status: false,
        errormessage: '',
        courseName: ''
    }
    let auth = checkAuth(accessId, sign, con)
    //auth.auth==falseしたら中断
    //accessアカウントは先生チェック、そうでなければ中断
    //該当コース名を更新、新しいコース名を入れて、status: trueにして返す
    //該当コース存在しない、既に存在したコース名に更新したらerrormessageにメッセジー入れて返す
    if(auth.auth){
        if(auth.isMain){
            if(beforeCourseName==afterCourseName){
                json.errormessage = "元のコース名と新コース名は同じです"
            }
            else{
                let r_courseName = con.query(`SELECT courseName FROM course 
                        WHERE idSensei = ${auth.id}
                        AND courseName NOT IN (${beforeCourseName})`)
                let flag = true
                for(i=0; i<r_courseName.length; i++){
                    if(afterCourseName==r_courseName[i].courseName){
                        flag = false
                        json.errormessage = `${afterCourseName}のコース名は既に登録されています。`
                        break
                    }
                }
                if(flag){
                    let r_courseId = con.query(`SELECT courseId FROM course WHERE idSensei = ${auth.id} AND courseName = "${beforeCourseName}" FOR UPDATE`)
                    con.query(`UPDATE course SET courseName = "${afterCourseName}" WHERE courseId = ${r_courseId[0].courseId}`)
                    con.query("COMMIT")
                    json.status = true
                }
            }
        }
        else{
            json.errormessage = "アカウントが先生以外は操作できません。"
        }
    }
    return {...json, ...auth}
}