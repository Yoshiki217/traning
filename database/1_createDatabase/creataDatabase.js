// 1

// database name : customerdb
// host : localhost
// user : projectg
// password : fitness

// mysqlを呼び出す
mysql = require("mysql")

// コネクションを作成
con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
})

// コネクションを始まる
con.connect(function(err){
    if(err) throw err;
    // コネクション成功を知らせ
    console.log("Connected!")

    // 前のユーザを消す
    con.query("DROP USER projectg", function(err, result){
        if(err) throw err
        // 実行が成功を知らせ
        console.log("User deleted.")
    })

    // ユーザを作成
    con.query("CREATE USER projectg IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY 'fitness'", function(err, result){
        if(err) throw err
        // 実行が成功を知らせ
        console.log("User created.")
    })

    // 前のデータベースを削除
    con.query("DROP DATABASE customerdb", function(err, result){
        if(err) throw err
        // 実行が成功を知らせ
        console.log("Database dropped.")
    })

    // mysql命令を実行
    con.query("CREATE DATABASE customerdb", function(err, result){
        if(err) throw err
        // 実行が成功を知らせ
        console.log("Database created.")
    })

    // ユーザにデータベース権限付与
    con.query("GRANT ALL ON customerdb.* TO projectg", function(err, result){
        if(err) throw err
        // 実行が成功を知らせ
        console.log("Permission granted.")
    })
})

// コネクションを終える
con.end()
console.log("Disconnected!")