const checkAuth = (accessId, sign, con) => {
    let json = {
        auth: false,
        sign: '',
        id : '',
        isMain: false
    }
    //accessIdとsignの存在チェック
    //一つだけレコード存在したらauth: trueにし、返す
    let result = con.query(`SELECT accessId, sign, id FROM access WHERE accessId = ${accessId} AND sign = "${sign}"`)
    if(result.length != 0){
        json.auth = true
        json.sign = result[0].sign
        json.id = result[0].id
        let result_isMain = con.query(`SELECT idSensei FROM account WHERE id = ${result[0].id}`)
        if(result_isMain[0].isSensei==null){
            json.isMain = true
        }
    }

    return json
}

exports.checkAuth=checkAuth

exports.register = (accountName, password, con) => {
    let json = {
        status: false,
        errormessage: ''
    }
    //新しアカウント作成、この時isMainの値はtrue
    //成功したらstatus: trueにして返す
    //失敗したらerrormessageにメッセジー入れて返す
    // let auth = checkAuth(accessId, sign, con)
    // if(auth.isMain){
        let r_accountName = con.query(`SELECT accountName FROM account WHERE accountName="${accountName}" FOR UPDATE`)
        if(r_accountName!=0){
            con.query("ROLLBACK")
            json.errormessage = "このアカウントは既にに登録されました。"
        }else{
            con.query(`INSERT INTO account(accountName, password) VALUES("${accountName}","${password}")`)
            con.query("COMMIT")
            json.status = true
        }
    // }else{
        // json.errormessage = "アカウントが先生以外は操作できません。"
    // }
    
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
        con.query("ROLLBACK")
        json.errormessage = "アカウントは間違っています、又はまだ登録していません。"
    }else if(password!=r_check[0].password){
        con.query("ROLLBACK")
        json.errormessage = "パスワードは間違っています。"
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
            avatar: '',
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
                //         avatar: '',
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
        let r_information = con.query(`SELECT name, email, DATE_FORMAT(birthday, '%Y-%m-%d') AS birthday, telNum, sex, address, avatar FROM information WHERE id = "${id}"`)

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
                        avatar: '',
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
                        avatar: r_information[0].avatar,
                        isMain: auth.isMain,
                        courses: [],
                    }
                }
            }
            // idSensei = id の各idの情報を取得
            let r_idSeito = con.query(`SELECT  a1.accountName, a1.courseName, 
                                            i2.name, i2.email, DATE_FORMAT(i2.birthday, '%Y-%m-%d') AS birthday, i2.telNum, i2.sex, i2.address , i2.avatar
                                    FROM accountView a1 
                                    LEFT JOIN information i2 
                                    ON a1.id = i2.id 
                                    WHERE idSensei = ${id}
                                    ORDER BY a1.id`)
            r_idSeito.forEach(i=>{
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
                            avatar: i.avatar,
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
                            avatar: '',
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
                        avatar: '',
                        isMain: auth.isMain,
                        courses: [
                            {
                                courseName: r_accountView[0].courseName,
                                subAccountInfo: {
                                    accountName: r_accountView[0].accountName,
                                    userName: '',
                                    email: '',
                                    birthday: '',
                                    phone: '',
                                    sex: 0,
                                    address: '',
                                    avatar: '',
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
                        avatar: r_information[0].avatar,
                        isMain: auth.isMain,
                        courses: [
                            {
                                courseName: r_accountView[0].courseName,
                                subAccountInfo: {
                                    accountName: r_accountView[0].accountName,
                                    userName: r_information[0].name,
                                    email: r_information[0].email,
                                    birthday: r_information[0].birthday,
                                    phone: r_information[0].telNum,
                                    sex: r_information[0].sex,
                                    address: r_information[0].address,
                                    avatar: r_information[0].avatar,
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
    //     address: '',
    //     avatar: 'ssdvs' || ''
    // }
    console.log(info)
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
        con.query(`INSERT INTO information(id, name, email, birthday, telNum, sex, address, avatar) VALUES (
            ${id}, "${info.userName}", "${info.email}", "${info.birthday}", ${info.phone}, ${info.sex}, "${info.address}", "${info.avatar}"
        ) ON DUPLICATE KEY UPDATE
            name = "${info.userName}",
            email = "${info.email}",
            birthday = "${info.birthday}",
            telNum = "${info.phone}",
            sex = ${info.sex},
            address = "${info.address}",
            avatar = "${info.avatar}"
        `)
        con.query("COMMIT")
        json.status = true
    }
    return {...json, ...auth}
}

exports.updateBodyParams = (accessId, sign, info, con) => {
    // info: {
    //     weight: Number,
    //     height: Number,
    //     date: String
    // }
    let json = {
        status: false,
        errormessage: "",
        paramsInfo: {
            weight: 0,
            height: 0,
            date: ""
        }
    }
    let auth = checkAuth(accessId, sign, con)
    if(auth.auth){
        let findAsDate = con.query(`SELECT id, weight, height FROM bodyParameter WHERE idUser=${auth.id} AND date="${info.date}" FOR UPDATE`)
        if(findAsDate.length != 0){
            if(findAsDate[0].weight != info.weight || findAsDate[0].height != info.height){
                con.query(`UPDATE bodyParameter 
                            SET weight = ${info.weight}, height = ${info.height} 
                            WHERE idUser=${auth.id} AND date="${info.date}"`
                )
                con.query("COMMIT")
                json.status = true
                json.paramsInfo = {
                    weight: info.weight,
                    height: info.height,
                    date: info.date
                }
            }else{
                con.query("ROLLBACK")
                json.status = true
                json.paramsInfo = {
                    weight: info.weight,
                    height: info.height,
                    date: info.date
                }
            }
        }else{
            con.query(`INSERT INTO bodyParameter(idUser, weight, height, date) 
                           VALUES (
                            ${auth.id},
                            ${info.weight},
                            ${info.height},
                            "${info.date}"
                            )`
            )
            con.query("COMMIT")
            json.status = true
            json.paramsInfo = {
                weight: info.weight,
                height: info.height,
                date: info.date
            }
        }

    }
    return {...json, ...auth}
}

exports.removeBodyParams = (accessId, sign, date, con) => {
    //     date: String
    let json = {
        status: false,
        errormessage: ""
    }
    let auth = checkAuth(accessId, sign, con)
    if(auth.auth){
        findInfo = con.query(`SELECT id FROM bodyParameter WHERE idUser=${auth.id} AND date="${date}" FOR UPDATE`)
        if(findInfo.length==1){
            con.query(`DELETE FROM bodyParameter 
                        WHERE id=${findInfo[0].id}`)
            con.query("COMMIT")
            json.status = true
        }else if (findInfo.length==0){
            con.query("ROLLBACK")
            json.errormessage = `${date}は見つかりません!`
        }
    }
    return {...json, ...auth}
}

exports.bodyParams = (accessId, sign, year, month, con) => {
    let json = {
        status: false,
        errormessage: "",
        paramInfos: [
            // {
            //     weight: 0,
            //     height: 0,
            //     date: ""
            // }
        ]
    }
    let auth = checkAuth(accessId, sign, con)
    if(auth.auth){
        data = con.query(`SELECT DATE_FORMAT(date, '%Y-%m-%d') as date, weight, height FROM bodyParameter 
                        WHERE idUser=${auth.id} AND date like "${year}-${month}-%"`)
        if (data.length != 0){
            data.forEach(d=>{
                json.paramInfos.push({
                    weight : d.weight,
                    height : d.height,
                    date : d.date
                })
            })
        }
        json.status = true
    }
    return {...json, ...auth}
}

exports.passwordChange = (accessId, sign, password, con) => {
    let json = {
        status: false,
        errormessage: ""
    }

    let auth = checkAuth(accessId, sign, con)
    if(auth.auth){
        con.query(`SELECT 1 FROM account LIMIT 1 FOR UPDATE`)
        con.query(`UPDATE account 
                    SET password = "${password}" 
                    WHERE id = ${auth.id}`)
        con.query("COMMIT")
        json.status = true
    }
    return {...json, ...auth}
}