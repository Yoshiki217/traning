exports.checkAuth = (accessId, sign) => {
    let json = {
        auth: false,
        sign: ''
    }
    //accessIdとsignの存在チェック
    //一つだけレコード存在したらauth: trueにし、signを更新して返す
    return json
}

exports.register = (accountName, password) => {
    let json = {
        status: false,
        erromessage: ''
    }
    //新しアカウント作成、この時isMainの値はtrue
    //成功したらstatus: trueにして返す
    //失敗したらerrormessageにメッセジー入れて返す
    return json
}

exports.login = (accountName, password) => {
    let json = {
        status: false,
        erromessage: '',
        accessId: 0,
        sign: ''
    }
    //accountNameとpasswordの存在チェック
    //存在したら新しいaccessレコード作成し、accessIdとsignに該当の値を入れて、アカウント検索、isMainの値を入れてstatus: trueにして返す
    //存在しなければerrormessageにメッセジー入れて返す
    return json
}

exports.logout = (accessId, sign) => {
    let json = {
        status: false,
        erromessage: ''
    }
    let auth = checkAuth(accessId, sign)
    //????
    //該当のaccessレコードを削除
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
            isMain: false,
            couses: [
                {
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
            ],
        }
    }
    let auth = checkAuth(accessId, sign)
    //auth.auth==falseしたら実行中断
    //アカウント情報入れてstatus: trueにして返す
    return {...json, ...auth}
}

exports.updateInfo = (accessId, sign, accountName, info) => {
    let json = {
        status: false,
        erromessage: ''
    }
    let auth = checkAuth(accessId, sign)
    //auth.auth==falseしたら実行中断
    //accessアカウントによって目標のaccountNameにアクセス権限があるかどうか調べる
    //権限があれば該当情報アップデート、status: trueにして返す
    //権限がなければerrormessageにメッセジーを入れる
    return {...json, ...auth}
}