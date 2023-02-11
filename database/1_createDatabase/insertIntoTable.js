const mysql = require("mysql2")

con = mysql.createConnection({
        host: "localhost",
        user: "projectg",
        password: "fitness",
        database : "customerdb"
})

// 1/ account
// sensei account
sql = `insert into account(accountName, password) 
        values("TTT", "TTT")`
con.query(sql)
sql = `insert into account(accountName, password) 
        values("TVD", "TVD")`
con.query(sql)
sql = `insert into account(accountName, password) 
        values("HAYA", "HAYA")`
con.query(sql)
sql = `insert into account(accountName, password) 
        values("FUJI", "FUJI")`
con.query(sql)

// seito account
sql = `insert into account(accountName, password, idSensei) 
        values("TSeito", "TSeito", 1)`
con.query(sql)
sql = `insert into account(accountName, password, idSensei) 
        values("DSeito", "DSeito", 2)`
con.query(sql)
sql = `insert into account(accountName, password, idSensei) 
        values("HSeito", "HSeito", 3)`
con.query(sql)
sql = `insert into account(accountName, password, idSensei) 
        values("FSeito", "FSeito", 4)`
con.query(sql)

// 2/information
sql = `insert into information
        values  (1, "TTT", "1999/5/28", "address", "123456789", "email@gmail.com", true, null),
                (3, "HAYA", "1996/3/8", "address", "123456789", "email@gmail.com", false, null),
                (6, "DSeito", "1989/2/12", "address", "123456789", "email@gmail.com", true, null),
                (8, "FUJI", "2001/8/17", "address", "123456789", "email@gmail.com", false, null)`
con.query(sql)

// 3/ bodyParameter
sql = `insert into bodyParameter
        values  (2, 78, 178, 34),
                (4, 68, 166, 34),
                (5, 92, 188, 34),
                (7, 90, 172, 34)`
con.query(sql)

// 4/ access

// 5/ course
sql = `insert into course (courseName, idSeito, idSensei)
        values  ("TTTcourse", 5, 1),
                ("TVDcourse", 6, 2),
                ("HAYAcourse", 7, 3),
                ("FUJIcourse", 8, 4)`
con.query(sql)

// 6/ eventType
sql = `insert into eventType (idSensei, eventTypeName)
        values  (1, "chest"),
                (1, "butt"),
                (2, "chest"),
                (2, "butt"),
                (3, "chest"),
                (3, "butt"),
                (4, "chest"),
                (4, "butt")`
con.query(sql)

// 7/ event
sql = `insert into event (idSeito, eventTypeId, eventName, eventWeightAmount, eventWeightUnit, eventTimesAmount, eventTimesUnit, date)
        values  (5, 1, "chest press", 30, "kg", 3, "reps", "2022/12/12"),
                (5, 2, "swat", 60, "kg", 3, "reps", "2022/12/13"),
                (6, 1, "chest press", 50, "kg", 3, "reps", "2022/12/12"),
                (6, 2, "swat", 60, "kg", 3, "reps", "2022/12/13"),
                (7, 1, "chest press", 50, "kg", 3, "reps", "2022/12/12"),
                (7, 2, "swat", 60, "kg", 3, "reps", "2022/12/13"),
                (8, 1, "chest press", 50, "kg", 3, "reps", "2022/12/12"),
                (8, 2, "swat", 60, "kg", 3, "reps", "2022/12/13")`
con.query(sql)

// 8/ logtest
sql = `insert into logText (eventId, id, logText)
        values  (1, 1, "これをやれ"),
                (2, 1, "これもやれ"),
                (1, 5, "できた"),
                (2, 5, "はいよ"),
                (3, 2, "これをやれ"),
                (4, 2, "これもやれ"),
                (3, 6, "できた"),
                (4, 7, "はいよ"),
                (5, 3, "これをやれ"),
                (6, 3, "これもやれ"),
                (5, 7, "できた"),
                (6, 7, "はいよ"),
                (7, 4, "これをやれ"),
                (8, 4, "これもやれ"),
                (7, 8, "できた"),
                (8, 8, "はいよ")`
con.query(sql)

con.query("COMMIT")
con.end()