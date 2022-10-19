// 22

// database name : customerdb
// host : localhost
// user : projectg
// password : fitness


// mysqlを呼び出す
mysql = require("mysql2")

// コネクションを作成
con = mysql.createConnection({
        host: "localhost",
        user: "projectg",
        password: "fitness",
        database : "customerdb"
    })

function dropTable(tableName){
    // コネクションを始まる
    con.connect(function(err){
        if(err) throw err;
        sql = "DROP TABLE " + tableName
        // mysql命令を実行
        con.query(sql, function(err, result){
            if(err) throw err;
            console.log("テーブル : " + tableName + " -> 削除.")
        })
    })
}

function createTable(sql, tableName){
    // コネクションを始まる
    con.connect(function(err){
        if(err) throw err;
        // mysql命令を実行
        con.query(sql, function(err){
            if(err) throw err;
            console.log("テーブル : " + tableName + " -> 作成.")
        })
    })
}

//////////////////////////// drop table
// 始めの実行なら　dropTable をコメントにする
// 2回目の実行から　コメントを外れる
// dropTable("logText")
// dropTable("eventInfo")
// dropTable("event")
// dropTable("eventType")

// dropTable("course")
// dropTable("access")
// dropTable("bodyParameter")
// dropTable("information")

// dropTable("account")

//////////////////////////// create table
// 1/ account
tableName = "account"
sql = "CREATE TABLE account("                              +
        "id VARCHAR(6) PRIMARY KEY AUTO_INCREMENT,"        +
        "accountName VARCHAR(20) NOT NULL UNIQUE,"                         +
        "password VARCHAR(50) NOT NULL,"                            +
        "idSensei VARCHAR(4) NULL,"                        +
        "CONSTRAINT fk_self FOREIGN KEY(idSensei) REFERENCES account(id) ON DELETE CASCADE)"
createTable(sql, tableName)

// 2/ information
tableName = "information"
sql = "CREATE TABLE information("           +
        "id VARCHAR(20) PRIMARY KEY,"       +
        "name VARCHAR(20),"                 +
        "birthday DATE,"                    +
        "address VARCHAR(100),"             +
        "telNum VARCHAR(13),"               +
        "email VARCHAR(50),"                +
        "sex BOOLEAN,"                      +
        "CONSTRAINT fk_in FOREIGN KEY (id) REFERENCES account(id) ON DELETE CASCADE)"
createTable(sql, tableName)

// 3/ bodyParameter
tableName = "bodyParameter"
sql = "CREATE TABLE bodyParameter("         +
        "id VARCHAR(6) PRIMARY KEY,"        +
        "weight INT,"                       +
        "height INT,"                       +
        "BMI INT,"                          +
        "CONSTRAINT fk_bdp FOREIGN KEY (id) REFERENCES account(id) ON DELETE CASCADE)"
createTable(sql, tableName)

// 4/ access
tableName = "access"
sql = "CREATE TABLE access("                            +
        "accessId INT PRIMARY KEY AUTO_INCREMENT,"      +
        "sign VARCHAR(50),"                             +
        "id VARCHAR(6),"                                +
        "CONSTRAINT fk_ida FOREIGN KEY (id) REFERENCES account(id) ON DELETE CASCADE)"
createTable(sql, tableName)

// 5/ course
tableName = "course"
sql = "CREATE TABLE course("                            +
        "courseId INT PRIMARY KEY AUTO_INCREMENT,"      +
        "courseName VARCHAR(20),"                       +
        "idSeito VARCHAR(6),"                           +
        "CONSTRAINT fk_acc2 FOREIGN KEY (idSeito) REFERENCES account(id) ON DELETE CASCADE)"
createTable(sql, tableName)

// 6/ eventType
tableName = "eventType"
sql = "CREATE TABLE eventType("                         +
        "eventTypeId INT PRIMARY KEY AUTO_INCREMENT,"   +
        "idSensei VARCHAR(6),"                          +
        "eventTypeName VARCHAR(20),"                    +
        "CONSTRAINT fk_ids FOREIGN KEY (idSensei) REFERENCES account(id) ON DELETE CASCADE)"
createTable(sql, tableName)

// 7/ event
tableName = "event"
sql = "CREATE TABLE event("                             +
        "eventId INT PRIMARY KEY AUTO_INCREMENT,"       +
        "idSensei VARCHAR(6),"                          +
        "idSeito VARCHAR(6),"                           +
        "eventName VARCHAR(20),"                        +
        "CONSTRAINT fk_idsei1 FOREIGN KEY (idSensei) REFERENCES account(id) ON DELETE CASCADE,"+
	"CONSTRAINT fk_idsei2 FOREIGN KEY (idSeito) REFERENCES account(id) ON DELETE CASCADE)"
createTable(sql, tableName)

// 8/ eventInfo
tableName = "eventInfo"
sql = "CREATE TABLE eventInfo("                         +
        "eventId INT PRIMARY KEY AUTO_INCREMENT,"       +
        "eventTypeId INT,"                              +
        "idSensei VARCHAR(6),"                          +
        "eventWeightAmount INT,"                        +
        "eventWeightUnit VARCHAR(20),"                  +
        "eventTimesAmount INT,"                         +
        "eventTimeUnit VARCHAR(20),"                    +
        "CONSTRAINT fk_evt FOREIGN KEY (eventTypeId) REFERENCES eventType(eventTypeId) ON DELETE CASCADE)"
createTable(sql, tableName)

// 9 logText
tableName = "logText"
sql = "CREATE TABLE logText("                           +
        "eventId INT PRIMARY KEY,"                      +
        "id VARCHAR(6),"                                +
        "logText VARCHAR(200),"                         +
        "CONSTRAINT fk_evi FOREIGN KEY (eventId) REFERENCES event(eventId),"+
        "CONSTRAINT fk_accid FOREIGN KEY (id) REFERENCES account(id) ON DELETE CASCADE)"
createTable(sql, tableName)

// 10 view 
viewName = "accountView"
sql = `CREATE VIEW accountView AS 
        SELECT a1.id, a1.idSensei,a1.accountName, c2.courseId, c2.courseName
        FROM account a1, course c2 
        WHERE c2.idSeito = a1.id`
createTable(sql, viewName)
// コネクションを終える
con.end()