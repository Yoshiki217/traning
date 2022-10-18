const connectDatabase = () => {
    mysql = require("mysql2")
    con = mysql.createConnection({
        host: "localhost",
        user: "projectg",
        password: "fitness",
        database: " customerdb"
    })
    return con
}

exports.connectDatabase

// [
//     {field: value, field: value},
//     {},
//     {}
// ]

const checkAuth = (accessId, sign) => {
    let json = {
        auth: false,
        sign: '',
        id : ''
    }
    //accessIdとsignの存在チェック
    //一つだけレコード存在したらauth: trueにし、返す
    con = connectDatabase()
    con.connect()

    sql = `SELECT accessId, sign, id FROM access WHERE accessId = ${accessId}`
    con.query(sql, function(err, result){
        if(err) throw err
        // accessIdは見つからない
        if(result.length==0){
            json.erromessage = "accessIdは見つからない"
        }
        // signは合わない
        else if(result[0].sign!=sign){
            json.erromessage = "signは合わない"
        }
        // accessId, sign は合う
        else{
            json.auth = true
            json.sign = sign
            json.id = result[0].id
        }
    })

    con.end()
    return json
}

exports.checkAuth

exports.register = (accountName, password) => {
    let json = {
        status: false,
        erromessage: ''
    }
    //新しアカウント作成、この時isMainの値はtrue
    //成功したらstatus: trueにして返す
    //失敗したらerrormessageにメッセジー入れて返す
    sql = `SELECT accountName FROM account WHERE accountName="${accountName}"`
    con = connectDatabase()
    con.connect()
    con.query(sql, function(err, result){
        if(err) throw err
        if(result.length!=0){
            json.erromessage = "このaccountNameはすでに登録された"
        }else{
            sql = `INSERT INTO account(accountName, password)
                    VALUES("${accountName}","${password}")`
            con.query(sql, function(err){
                if(err) throw err
                json.status = true
            })
        }
    })
    con.end()
    return json
}

exports.login = (accountName, password) => {
    let json = {
        status: false,
        erromessage: '',
        accessId: 0,
        sign: ''
        //isMainいらない
    }
    //accountNameとpasswordの存在チェック
    //存在したら新しいaccessレコード作成し、accessIdとsignに該当の値を入れて、アカウント検索、isMainの値を入れてstatus: trueにして返す
    //存在しなければerrormessageにメッセジー入れて返す
    con = connectDatabase()
    con.connect()

    sql = `SELECT id, accountName, password, idSensei FROM account
             WHERE accountName ="${accountName}"`
    con.query(sql, function(err, result){
        if(err) throw err
        // acountName見つからない
        if(result.length==0){
            json.erromessage = "accountNameは間違う又はまだ登録してない"
        }
        // passwordが違う
        else if(password!=result[0].password){
            json.erromessage = "passwordは間違う"
        }
        // acountName, passwordが合う
        else {
            id = result[0].id

            // signを作成
            crypto = require("crypto")
            sign = crypto.randomBytes(25).toString('hex')

            sql = `INSERT INTO access(sign, id) VALUES("${sign}","${id}")`
            con.query(sql, function(err){
                if(err) throw err
                sql = "SELECT LAST_INSERT_ID()"
                con.query(sql, function(err, result){
                    if(err) throw err
                    json.status = true
                    json.accessId = result[0].LAST_INSERT_ID()
                    json.sign = sign
                })
                
            })
        }
    })

    con.end()
    return json
}

exports.logout = (accessId, sign) => {
    let json = {
        status: false,
        erromessage: ''
    }
    let auth = checkAuth(accessId, sign)

    //該当のaccessレコードを削除status: true
    if(auth.auth){
        con = connectDatabase()
        con.connect()

        sql = `DELETE FROM access WHERE accessId = ${accessId}`
        con.query(sql, function(err){
            if(err) throw err
            json.status = true
        })

        con.end()
    }
    
    return {...json, ...auth}
}

exports.account = (accessId, sign) => {
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
    let auth = checkAuth(accessId, sign)
    //auth.auth==falseしたら実行中断
    //アカウント情報入れてstatus: trueにして返す
    if(auth.auth){
        con = connectDatabase()
        con.connect()
    
        id = auth.id
        sql = `SELECT id, idSensei, accountName, courseName FROM accountView WHERE id = "${id}"`
        con.query(sql, function(err, result_accountView){
            if(err) throw err

            // idの情報を取得
            sql = `SELECT name, email, birthday, telNum, sex, address FROM information WHERE id = "${id}"`
            con.query(sql, function(err, result_information){
                if(err) throw err
                course = {
                    courseName: '',
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
                //json.accountInfo
                json.accountInfo.accountName    = result_accountView[0].accountName
                json.accountInfo.userName       = result_information[0].name
                json.accountInfo.email          = result_information[0].email
                json.accountInfo.birthday       = result_information[0].birthday
                json.accountInfo.phone          = result_information[0].telNum
                json.accountInfo.sex            = result_information[0].sex
                json.accountInfo.address        = result_information[0].address
                // idSensei != null -> idは生徒  -> idの情報を取得
                if(result_accountView[0].idSensei!=null){
                    //json.accountInfo.courses
                    course.courseName                  = result_accountView[0].courseName
                    course.subAccountInfo.accountName  = result_accountView[0].accountName
                    course.subAccountInfo.userName     = result_information[0].name
                    course.subAccountInfo.email        = result_information[0].email
                    course.subAccountInfo.birthday     = result_information[0].birthday
                    course.subAccountInfo.phone        = result_information[0].telNum
                    course.subAccountInfo.sex          = result_information[0].sex
                    course.subAccountInfo.address      = result_information[0].address
                    
                    json.accountInfo.courses.push(course)
                    json.status = true

                }
                // idSensei == null -> idは先生　->　idの情報を取得　-> idSensei = id の各idの情報を取得
                else if(result_accountView[0].idSensei==null){
                    json.accountInfo.isMain = true
                    sql = `SELECT id, courseName FROM accountView WHERE idSensei = "${id}"`
                    con.query(sql, function(err, result_idSeito){
                        if(err) throw err
                        for(let i=0 ; i<result_idSeito.length ; i++){
                            id = result_idSeito[i].id
                            course.courseName = result_idSeito[i].courseName
                            sql = `SELECT name, email, birthday, telNum, sex, address FROM information WHERE id = "${id}"`
                            con.query(sql, function(err, result_idSeito_information){
                                if(err) throw err
                                course.subAccountInfo.accountName  = result_idSeito_information[0].accountName
                                course.subAccountInfo.userName     = result_idSeito_information[0].name
                                course.subAccountInfo.email        = result_idSeito_information[0].email
                                course.subAccountInfo.birthday     = result_idSeito_information[0].birthday
                                course.subAccountInfo.phone        = result_idSeito_information[0].telNum
                                course.subAccountInfo.sex          = result_idSeito_information[0].sex
                                course.subAccountInfo.address      = result_idSeito_information[0].address
                            })
                            json.accountInfo.courses.push(course)
                        }
                        json.status = true
                    })   
                }
            })
        })
    

        con.end()
    }
    return {...json, ...auth}
}

exports.updateInfo = (accessId, sign, accountName, info) => {
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
    let auth = checkAuth(accessId, sign)
    //auth.auth==falseしたら実行中断
    //accessアカウントによって目標のaccountNameにアクセス権限があるかどうか調べる
    //権限があれば該当情報アップデート、status: trueにして返す
    //権限がなければerrormessageにメッセジーを入れる
    if(auth.auth){
        con = connectDatabase()
        con.connect()

        id = auth.id
        sql = `UPDATE account SET accountName = "${accountName}" WHERE id = "${id}"`
        con.query(sql,function(err){
            if(err) throw err
        })

        sql = `UPDATE information 
                SET name = "${info.userName}",
                    birthday = "${info.birthday}",
                    address = "${info.address}",
                    telNum = "${info.phone}",
                    email = "${info.email}",
                    sex = ${info.sex},
                WHERE id = "${id}"`
        con.query(sql,function(err){
            if(err) throw err
        })
        con.end()
        json.status = true
    }
    return {...json, ...auth}
}