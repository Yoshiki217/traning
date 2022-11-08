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
    sql = `DROP TABLE IF EXISTS ${tableName}`
    // mysql命令を実行
    con.query(sql)
    console.log("テーブル : " + tableName + " -> 削除")
}

function dropView(viewName){
    sql = `DROP VIEW IF EXISTS ${viewName}`
    con.query(sql)
    console.log("ビュー : " + viewName + " -> 削除")
}

function createTable(sql, tableName){
    // mysql命令を実行
    con.query(sql)
    console.log("テーブル : " + tableName + " -> 作成")
}

function createView(sql, viewName){
     // mysql命令を実行
    con.query(sql)
    console.log("ビュー : " + viewName + " -> 作成")
}

//////////////////////////// drop table, view
dropView("accountView")

dropTable("logText")
dropTable("eventInfo")
dropTable("event")
dropTable("eventType")

dropTable("course")
dropTable("access")
dropTable("bodyParameter")
dropTable("information")

dropTable("account")

//////////////////////////// create table
// 1/ account
tableName = "account"
sql = `CREATE TABLE account(
        id INT PRIMARY KEY AUTO_INCREMENT,
        accountName VARCHAR(20) NOT NULL UNIQUE,
        password VARCHAR(50) NOT NULL,
        idSensei INT NULL,
        CONSTRAINT fk_self FOREIGN KEY(idSensei) REFERENCES account(id) ON DELETE CASCADE)`
createTable(sql, tableName)

// 2/ information
tableName = "information"
sql = `CREATE TABLE information(
        id INT PRIMARY KEY,
        name VARCHAR(20),
        birthday DATE,
        address VARCHAR(100),
        telNum VARCHAR(13),
        email VARCHAR(50),
        sex BOOLEAN,
        CONSTRAINT fk_in FOREIGN KEY (id) REFERENCES account(id) ON DELETE CASCADE)`
createTable(sql, tableName)

// 3/ bodyParameter
tableName = "bodyParameter"
sql = `CREATE TABLE bodyParameter(
        id INT PRIMARY KEY,
        weight INT,
        height INT,
        BMI INT,
        CONSTRAINT fk_bdp FOREIGN KEY (id) REFERENCES account(id) ON DELETE CASCADE)`
createTable(sql, tableName)

// 4/ access
tableName = "access"
sql = `CREATE TABLE access(
        accessId INT PRIMARY KEY AUTO_INCREMENT,
        sign VARCHAR(50),
        id INT,
        CONSTRAINT fk_ida FOREIGN KEY (id) REFERENCES account(id) ON DELETE CASCADE)`
createTable(sql, tableName)

// 5/ course
tableName = "course"
sql = `CREATE TABLE course(
        courseId INT PRIMARY KEY AUTO_INCREMENT,
        courseName VARCHAR(20),
        idSeito INT,
        idSensei INT,
        CONSTRAINT fk_acc1 FOREIGN KEY (idSensei) REFERENCES account(idSensei) ON DELETE CASCADE,
        CONSTRAINT fk_acc2 FOREIGN KEY (idSeito) REFERENCES account(id) ON DELETE CASCADE)`
createTable(sql, tableName)

// 6/ eventType
tableName = "eventType"
sql = `CREATE TABLE eventType(
        eventTypeId INT PRIMARY KEY AUTO_INCREMENT,
        idSensei INT,
        eventTypeName VARCHAR(20),
        CONSTRAINT fk_ids FOREIGN KEY (idSensei) REFERENCES account(id) ON DELETE CASCADE)`
createTable(sql, tableName)

// 7/ event
tableName = "event"
sql = `CREATE TABLE event(
        eventId INT PRIMARY KEY AUTO_INCREMENT,
        idSeito INT,
        eventTypeId INT,
        eventName VARCHAR(20),
        eventWeightAmount INT,
        eventWeightUnit VARCHAR(20),
        eventTimesAmount INT,
        eventTimesUnit VARCHAR(20),
        date DATE,
	CONSTRAINT fk_idsei2 FOREIGN KEY (idSeito) REFERENCES account(id) ON DELETE CASCADE,
        CONSTRAINT fk_eventT FOREIGN KEY (eventTypeId) REFERENCES eventType(eventTypeId) ON DELETE CASCADE)`
createTable(sql, tableName)

// 8 logText
tableName = "logText"
sql = `CREATE TABLE logText(
        logTextId INT PRIMARY KEY AUTO_INCREMENT,
        eventId INT,
        id INT,
        logText VARCHAR(200),
        CONSTRAINT fk_evi FOREIGN KEY (eventId) REFERENCES event(eventId) ON DELETE CASCADE,
        CONSTRAINT fk_accid FOREIGN KEY (id) REFERENCES account(id) ON DELETE CASCADE)`
createTable(sql, tableName)

// 9 accountView 
viewName = "accountView"
sql = `CREATE VIEW accountView AS 
        SELECT account.id, account.idSensei, account.accountName, course.courseId, course.courseName 
        FROM account 
        LEFT JOIN course 
        ON account.id = course.idSeito 
        ORDER BY account.id`
createView(sql, viewName)