// 1

// database name : customerdb
// host : localhost
// user : 
// password : 

// mysqlを呼び出す
mysql = require("mysql")

// コネクションを作成
con = mysql.createConnection({
    host: "localhost",
    user: "username",
    password: "password"
})

// コネクションを始まる
con.connect(function(err){
    if(err) throw err;
    // コネクション成功を知らせ
    console.log("Connected!")
    // mysql命令を実行
    con.query("CREATE DATABASE customerdb", function(err, result){
        if(err) throw err
        // 実行が成功を知らせ
        console.log("Database created.")
    })
})

// コネクションを終える
con.end()