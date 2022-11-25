// 1

// database name : customerdb
// host : localhost
// user : projectg
// password : fitness

// mysqlを呼び出す
mysql = require("mysql2")

// コネクションを作成
con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "yoshiki217"
})
// コネクション成功を知らせ
console.log("Connected!")

// 前のユーザを消す
con.query("DROP USER IF EXISTS projectg", function(err){
    if(err) throw err
    // 実行が成功を知らせ
    console.log("ユーザー   ー>   削除")
})

// ユーザを作成
con.query("CREATE USER projectg IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY 'fitness'", function(err){
    if(err) throw err
    // 実行が成功を知らせ
    console.log("ユーザー   ー>   作成")
})

// 前のデータベースを削除
con.query("DROP DATABASE IF EXISTS customerdb", function(err, result){
    if(err) throw err
    // 実行が成功を知らせ
    console.log("データベース   ー>   削除")
})

// mysql命令を実行
con.query("CREATE DATABASE customerdb", function(err){
    if(err) throw err
    // 実行が成功を知らせ
    console.log("データベース   ー>   作成")
})

// ユーザにデータベース権限付与
con.query("GRANT ALL ON customerdb.* TO projectg", function(err){
    if(err) throw err
    // 実行が成功を知らせ
    console.log("ユーザーの許可   ー>   承諾")
})