// 22

// mysqlを呼び出す
mysql = require("mysql")

// コネクションを作成
con = mysql.createConnection({
    host : "localhost",
    user : "username",
    password : "password",
    database : "customerdb"
})

function createTable(sql, tableName){
    // コネクションを始まる
    con.connect(function(err){
        if(err) throw err;
        console.log("Connected!")
        // mysql命令を実行
        con.query(sql, function(err, result){
            if(err) throw err;
            console.log("Table : " + tableName + " -> created.")
        })
    })
}

// accountテーブル
tableName = "account"
sql = "CREATE TABLE account("               +
        "id VARCHAR PRIMARY KEY,"           +
        "password VARCHAR,"                 +
        "senseito VARCHAR(6))"
createTable(sql, tableName)

// accountInformationテーブル
tableName = "accountInformation"
sql = "CREATE TABLE accountInformation("    +
        "id VARCHAR PRIMARY KEY,"           +
        "name VARCHAR,"                     +
        "sex CHAR(6),"                      +
        "birthday DATE,"                    +
        "email VARCHAR,"                    +
        "tel_num VARCHAR,"                  +
        "FOREIGN KEY fk_id (id) REFERENCES account(id) ON DELETE CASCADE)"
createTable(sql, tableName)

// bodyParameterテーブル
tableName = "bodyParameter"
sql = "CREATE TABLE bodyParameter("         +
        "id VARCHAR PRIMARY KEY,"           +
        "weight INT,"                       +
        "height INT,"                       +
        "BMI INT,"                          +
        "FOREIGN KEY fk_id (id) REFERENCES account(id) ON DELETE CASCADE)"
createTable(sql, tableName)

// nutritionテーブル
tableName = "nutrition"
sql = "CREATE TABLE nutrition("                                 +
        "id_sensei VARCHAR,"                                    +
        "id_seito VARCHAR,"                                     +
        "naiyou VARCHAR,"                                       +
        "date DATE,"                                            +
        "CONSTRAINT pri_id PRIMARY KEY (id_sensei, id_seito),"  +
        "FOREIGN KEY fk_id (id_sensei, id_seito) REFERENCES account(id) ON DELETE CASCADE)"
createTable(sql, tableName)

// shumokuNaiyouテーブル
tableName = "shumokuNaiyou"
sql = "CREATE TABLE shumokuNaiyou("         +
        "id_sensei VARCHAR PRIMARY KEY,"    +
        "shumoku_id INT AUTO_INCREMENT,"    +
        "shumoku_name VARCHAR,"             +
        "naiyou VARCHAR,"                   +
        "FOREIGN KEY fk_id (id_sensei) REFERENCES account(id) ON DELETE CASCADE)"
createTable(sql, tableName)

// shumokuテーブル
tableName = "shumoku"
sql = "CREATE TABLE shummoku("              +
        "id_sensei VARCHAR,"                +
        "id_seito VARCHAR,"                 +
        "shumoku_id INT,"                   +
        "set_num INT,"                      +
        "weight INT,"                       +
        "date DATE,"                        +
        "CONSTRAINT pri_id PRIMARY KEY (id_sensei, id_seito),"                              +
        "FOREIGN KEY fk_id (id_sensei, id_seito) REFERENCES account(id) ON DELETE CASCADE," +
        "FOREIGN KEY fk_shu (shumoku_id) REFERENCES shumokuNaiyou(shumoku_id) ON DELETE CASCADE)"
createTable(sql, tableName)


// コネクションを終える
con.end()