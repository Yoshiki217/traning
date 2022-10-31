const checkAuth = require('./account').checkAuth;
exports.createCourse = (accessId, sign, courseName, subAccountName, subAccountPassword) => {
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
    if(auth.auth){
        con = connectDatabase()
        con.connect()
        sql = `SELECT courseName FROM course 
                WHERE coureName = "${courseName}" 
                AND idSensei = ${auth.id}`
        con.query(sql, (err, result)=>{
            if(err) throw err
            if(result.length!=0){
                json.errormessage = `${courseName}のコース名はすでに登録されました。`
                con.end()
            }else{
                sql = `INSERT INTO account(accountName, password, idSensei) VALUES ("${subAccountName}", "${subAccountPassword}", ${auth.id})`
                con.query(sql, (err)=>{
                    if(err) throw err
                    sql = `SELECT LAST_INSERT_ID() AS last_id`
                    con.query(sql, (err, result)=>{
                        if(err) throw err
                        idSeito = result[0].last_id
                        sql = `INSERT INTO course(courseName, idSeito) VALUES ("${courseName}",${idSeito})`
                        con.query(sql, (err)=>{
                            if(err) throw err
                            con.query("COMMIT",()=>{
                                json.subAccountInfo.accountName = subAccountName
                                json.status = true
                                con.end()
                            })
                        })
                    })
                })
            }
        })
    }
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
    if(auth.auth){
        if(auth.isMain){
            con = connnectDatabase()
            con.connect()
            sql = `SELECT idSeito FROM course 
                    WHERE courseName = "${courseName}"
                    AND idSensei = ${auth.id}`
            con.query(sql, (err, result)=>{
                if(err) throw err
                if(result.length==0){
                    json.errormessage = `${courseName}のコース名は見つからない又はまだ登録されません。`
                    con.end()
                }else{
                    sql = `DELETE FROM account WHERE id = ${result[0].idSeito}`
                    con.query(sql, (err)=>{
                        if(err) throw err
                        con.query("COMMIT",()=>{
                            json.status = true
                            con.end()
                        })
                    })
                }
            })
        }else{
            json.errormessage = "アカウントが先生以外は操作できません。"
        }
        
    }
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
    if(auth.auth){
        if(auth.isMain){
            if(beforeCourseName==afterCourseName){
                json.errormessage = "元のコース名と新コース名は同じです"
            }else{
                con.connectDatabase()
                con.connect()
                sql = `SELECT courseName FROM course 
                        WHERE idSensei = ${auth.id}
                        AND courseName NOT IN (${beforeCourseName})`
                con.query(sql, (err, result)=>{
                    if(err) throw err
                    flag = true
                    for(i=0; i<result.length; i++){
                        if(afterCourseName==result[i].courseName){
                            flag = false
                            json.errormessage = `${afterCourseName}のコース名は既に登録されています。`
                            con.end()
                            break
                        }
                    }
                    if(flag){
                        sql = `SELECT courseId FROM course 
                                WHERE idSensei = ${auth.id} 
                                AND courseName = "${beforeCourseName}"`
                        con.query(sql, (err, result)=>{
                            if(err) throw err
                            sql = `UPDATE course 
                                    SET courseName = "${afterCourseName}"
                                    WHERE courseId = ${result[0].courseId}`
                            con.query(sql, (err)=>{
                                if(err) throw err
                                con.query("COMMIT", ()=>{
                                    json.status = true
                                    con.end()
                                })
                            })
                        })
                    }
                })
            }
        }else{
            json.errormessage = "アカウントが先生以外は操作できません。"
        }
    }
    return {...json, ...auth}
}