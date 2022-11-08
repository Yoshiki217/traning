const checkAuth = (accessId, sign, con) => {
    let json = {
        auth: false,
        sign: '',
        id : '',
        isMain: false
    }
    //accessIdとsignの存在チェック
    //一つだけレコード存在したらauth: trueにし、返す
    let result = con.query(`SELECT accessId, sign, id FROM access WHERE accessId = ${accessId} AND sign = "${sign}`)
    if(result.length != 0){
        json.auth = true
        json.sign = result[0].sign
        json.id = result[0].id
        let result_isMain = con.query(`SELECT idSensei FROM account WHERE id = ${result[0].id}`)
        if(result_isMain==0){
            json.isMain = true
        }
    }

    return json
}

exports.checkAuth

exports.register = (accountName, password, con) => {
    let json = {
        status: false,
        errormessage: ''
    }
    //新しアカウント作成、この時isMainの値はtrue
    //成功したらstatus: trueにして返す
    //失敗したらerrormessageにメッセジー入れて返す
    let auth = checkAuth(accessId, sign, con)
    if(auth.isMain){
        let r_accountName = con.query(`SELECT accountName FROM account WHERE accountName="${accountName}" FOR UPDATE`)
        if(r_accountName!=0){
            json.errormessage = "このaccountNameはすでに登録された。"
        }else{
            con.query(`INSERT INTO account(accountName, password) VALUES("${accountName}","${password}")`)
            con.query("COMMIT")
            json.status = true
        }
    }else{
        json.errormessage = "アカウントが先生以外は操作できません。"
    }
    
    return json
}

exports.login = (accountName, password, con) => {
    let json = {
        status: false,
        errormessage: '',
        accessId: 0,
        sign: ''
        //isMainいらない
    }
    //accountNameとpasswordの存在チェック
    //存在したら新しいaccessレコード作成し、accessIdとsignに該当の値を入れて、アカウント検索、isMainの値を入れてstatus: trueにして返す
    //存在しなければerrormessageにメッセジー入れて返す
    let r_check = con.query(`SELECT id, accountName, password, idSensei FROM account WHERE accountName ="${accountName}" FOR UPDATE`)
    if(r_check==0){
        json.errormessage = "accountNameは間違う又はまだ登録していません。"
        con.query("ROLLBACK")
    }else if(password!=r_check[0].password){
        json.errormessage = "passwordは間違います。"
        con.query("ROLLBACK")
    }else{
        let id = r_check[0].id
        // signを作成
        let crypto = require("crypto")
        let sign = crypto.randomBytes(25).toString('hex')
        
        let r_insert_sign = con.query(`INSERT INTO access(sign, id) VALUES("${sign}","${id}")`)
        con.query("COMMIT")

        json.accessId = r_insert_sign.insertId
        json.sign = sign
        json.status = true
    }
    return json
}

exports.logout = (accessId, sign, con) => {
    let json = {
        status: false,
        erromessage: ''
    }
    let auth = checkAuth(accessId, sign, con)
    //該当のaccessレコードを削除status: true  
    if(auth.auth){
        con.query(`SELECT 1 FROM access LIMIT 1 FOR UPDATE`)
        con.query(`DELETE FROM access WHERE accessId = ${accessId}`)
        con.query("COMMIT")
        json.status = true
    }
    return {...json, ...auth}
}

exports.account = (accessId, sign, con) => {
    let json = {
        status: false,
        erromessage: '',
        accountInfo: {
            accountName: '',
            userName: '',
            email: '',
            birthday: '',
            phone: '',
            sex: 0,
            address: '',
            //isMain 確定
            isMain: false,
            courses: [
                // {
                //     courseName: '',
                //     subAccountInfo: {
                //         accountName: '',
                //         userName: '',
                //         email: '',
                //         birthday: '',
                //         phone: '',
                //         sex: 0,
                //         address: '',
                //     }
                // }
            ],
        }
    }
    let auth = checkAuth(accessId, sign, con)
    //auth.auth==falseしたら実行中断
    //アカウント情報入れてstatus: trueにして返す
    if(auth.auth){
        let id = auth.id
        let r_accountView = con.query(`SELECT id, idSensei, accountName, courseName FROM accountView WHERE id = "${id}"`)
        let r_information = con.query(`SELECT name, email, DATE_FORMATE(birthday, '%Y-%m-%d') AS birthday, telNum, sex, address FROM information WHERE id = "${id}"`)

        // isMain == true -> idは先生　->　idの情報を取得　-> idSensei = id の各idの情報を取得
        if(auth.isMain){  
            // 個人情報がない
            if(r_information.length==0){
                json = {
                    status: false,
                    erromessage: '',
                    accountInfo: {
                        accountName: r_accountView[0].accountName,
                        userName: '',
                        email: '',
                        birthday: '',
                        phone: '',
                        sex: 0,
                        address: '',
                        isMain: auth.isMain,
                        courses: [],
                    }
                }
            }
            // 個人情報がある
            else{
                json = {
                    status: true,
                    erromessage: '',
                    accountInfo: {
                        accountName: r_accountView[0].accountName,
                        userName: r_information[0].name,
                        email: r_information[0].email,
                        birthday: r_information[0].birthday,
                        phone: r_information[0].telNum,
                        sex: r_information[0].sex,
                        address: r_information[0].address,
                        isMain: auth.isMain,
                        courses: [],
                    }
                }
            }
            // idSensei = id の各idの情報を取得
            let r_idSeito = con.query(`SELECT  a1.accountName, a1.courseName, 
                                            i2.name, i2.email, DATE_FORMATE(i2.birthday, '%Y-%m-%d') AS birthday, i2.telNum, i2.sex, i2.address 
                                    FROM accountView a1 
                                    LEFT JOIN information i2 
                                    ON a1.id = i2.id 
                                    WHERE idSensei = ${id}
                                    ORDER BY a1.id`)
            r_idSeito.foreach(i=>{
                if(i.name!=null){
                    json.accountInfo.courses.push({
                        courseName: i.courseName,
                        subAccountInfo: {
                            accountName: i.accountName,
                            userName: i.name,
                            email: i.email,
                            birthday: i.birthday,
                            phone: i.telNum,
                            sex: i.sex,
                            address: i.address,
                        }
                    })
                }else{
                    json.accountInfo.courses.push({
                        courseName: i.courseName,
                        subAccountInfo: {
                            accountName: i.accountName,
                            userName: '',
                            email: '',
                            birthday: '',
                            phone: '',
                            sex: 0,
                            address: '',
                        }
                    })
                }
            })
        }
        // isMain == false -> idは生徒  -> idの情報を取得
        else{ 
            // 個人情報がない
            if(r_information.length==0){
                json = {
                    status: false,
                    erromessage: '',
                    accountInfo: {
                        accountName: r_accountView[0].accountName,
                        userName: '',
                        email: '',
                        birthday: '',
                        phone: '',
                        sex: 0,
                        address: '',
                        isMain: auth.isMain,
                        courses: [
                            {
                                courseName: r_accountName[0].courseName,
                                subAccountInfo: {
                                    accountName: r_accountView[0].accountName,
                                    userName: '',
                                    email: '',
                                    birthday: '',
                                    phone: '',
                                    sex: 0,
                                    address: '',
                                }
                            }
                        ],
                    }
                }
            }
            // 個人情報がある
            else{
                json = {
                    status: true,
                    erromessage: '',
                    accountInfo: {
                        accountName: r_accountView[0].accountName,
                        userName: r_information[0].name,
                        email: r_information[0].email,
                        birthday: r_information[0].birthday,
                        phone: r_information[0].telNum,
                        sex: r_information[0].sex,
                        address: r_information[0].address,
                        isMain: auth.isMain,
                        courses: [
                            {
                                courseName: r_accountName[0].courseName,
                                subAccountInfo: {
                                    accountName: r_accountView[0].accountName,
                                    userName: r_information[0].name,
                                    email: r_information[0].email,
                                    birthday: r_information[0].birthday,
                                    phone: r_information[0].telNum,
                                    sex: r_information[0].sex,
                                    address: r_information[0].address,
                                }
                            }
                        ],
                    }
                }
            }
        }

        return {...json, ...auth}
    }
}

exports.updateInfo = (accessId, sign, info, con) => {
    // infoの中味
    // info = {
    //     userName: '',
    //     email: '',
    //     birthday: '',
    //     phone: '',
    //     sex: 0,
    //     address: ''
    // }
    let json = {
        status: false,
        erromessage: ''
    }
    let auth = checkAuth(accessId, sign, con)
    //auth.auth==falseしたら実行中断
    //accessアカウントによって目標のaccountNameにアクセス権限があるかどうか調べる
    //権限があれば該当情報アップデート、status: trueにして返す
    //権限がなければerrormessageにメッセジーを入れる
    if(auth.auth){
        let id = auth.id
        con.query('SELECT 1 FROM information LIMIT 1 FOR UPDATE')
        con.query(`INSERT INTO information(id, name, email, birthday, telNum, sex, address) VALUES (
            ${id}, ?, ?, ?, ?, ?, ?
        ) ON DUPLICATE KEY UPDATE
            name = ${info.userName},
            email = ${info.email},
            birthday = ${info.birthday},
            telNum = ${info.phone},
            sex = ${info.sex},
            address = ${info.address}
        `, info)
        con.query("COMMIT")
        json.status = true
    }
    return {...json, ...auth}
}