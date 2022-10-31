const checkAuth = require('./account').checkAuth;

exports.createEventType = (accessId, sign, info) => {
    // infoの中味
    // info = {
    //      eventTypeName: ''
    // }
    let json = {
        status: false, 
        errormessage: '',
        eventTypeInfo: {
            eventTypeId: 0,
            eventTypeName: ''
        }
    }
    let auth = checkAuth(accessId, sign)
    //auth.auth==falseしたら中断
    //accessアカウントは先生チェック、そうでなければ中断
    //eventTypeを作成して、情報を入れてstaus: trueにして返す
    if(auth.auth){
        if(auth.isMain){
            con = connectDatabase()
            con.connect()
            sql = `SELECT eventTypeName FROM eventType WHERE idSensei = ${auth.id}`
            con.query(sql, (err, result)=>{
                if(err) throw err
                flag = true
                for(i=0 ; i<result.length ; i++){
                    if(result[i].eventTypeName == info.eventTypeName){
                        json.errormessage = `${info.eventTypeName}の種目類名は既に登録されています。`
                        flag = false
                        con.end()
                        break
                    }
                }
                if(flag){
                    sql = `INSERT INTO eventType(idSensei, eventTypeName) 
                            VALUES (${auth.id},"${info.eventTypeName}")`
                    con.query(sql, (err)=>{
                        if(err) throw err
                        sql = `SELECT eventTypeId FROM eventType 
                                WHERE idSensei = ${auth.id} 
                                AND eventTypeName = "${info.eventTypeName}"`
                        con.query(sql, (err,result)=>{
                            if(err) throw err
                            json.eventTypeInfo.eventTypeId = result[0].eventTypeId
                            json.eventTypeInfo.eventTypeName = info.eventTypeName
                            con.query("COMMIT",()=>{
                                json.status = true
                                con.end()
                            })
                        })
                    })
                }
            })
        }else{
            json.errormessage = "アカウントが先生以外は操作できません。"
        }
    }
    return {...json, ...auth}
}

exports.eventTypes = (accessId, sign) => {
    let json = {
        status: false,
        errormessage: '',
        eventTypes: [
            // {
            //     eventTypeId: 0,
            //     eventTypeName: ''
            // }
        ]
    }
    let auth = checkAuth(accessId, sign)
    //auth.auth==falseしたら中断
    //accessアカウントは先生チェック、そうでなければ中断
    //eventTypeリストを入れてstatus: trueにして返す
    if(auth.auth){
        if(auth.isMain){
            con = connectDatabase()
            con.connect()
            sql = `SELECT eventTypeId, eventTypeName FROM eventType 
                    WHERE idSensei = ${auth.id}`
            con.query(sql, (err, result)=>{
                if(err) throw err
                if(result.length==0){
                    json.errormessage = "このアカウントは種目類まだ作成していません。"
                }else if(result.length!=0){
                    eventType = {
                        eventTypeId: 0,
                        eventTypeName: ''
                    }
                    result.foreach(et =>{
                        eventType.eventTypeId = et.eventTypeId
                        eventType.eventTypeName = et.eventTypeName
                        json.eventTypes.push(eventType)
                    })
                    json.status = true
                    con.end()
                }
            })
        }else{
            json.errormessage = "アカウントが先生以外は操作できません。"
        }
    }
    return {...json, ...auth}
}

exports.changeEventTypeName = (accessId, sign, eventTypeId, afterEventTypeName) => {
    let json = {
        status: false, 
        errormessage: '',
        eventTypeInfo: {
            eventTypeId: 0,
            eventTypeName: ''
        }
    }
    let auth = checkAuth(accessId, sign)
    //auth.auth==falseしたら中断
    //accessアカウントは先生チェック、そうでなければ中断
    //accessアカウントはeventTypeIdにアクセス権限を調べる、なければ中断
    //該当のeventType名を更新、新しい情報を入れて返す
    if(auth.auth){
        if(auth.isMain){
            eventTypes = eventTypes(accessId, sign)
            if(eventTypes.status){
                sql = `SELECT eventTypeName FROM eventType 
                        WHERE idSensei = ${auth.id} 
                        AND eventTypeId = ${eventTypeId}`
                con.query(sql, (err, result)=>{
                    if(err) throw err
                    if(afterEventTypeName == result[0].eventTypeName){
                        json.errormessage = "新の種目類名は元の種目類名と同じです。"
                        con.end()
                    }else{
                        sql = `UPDATE eventType SET eventTypeName = "${afterEventTypeName}" 
                                WHERE idSensei = ${auth.id} 
                                AND eventTypeId = ${eventTypeId}`
                        con.query(sql, (err)=>{
                            if(err) throw err
                            con.query("COMMIT", ()=>{
                                json.status = true
                                json.eventTypeInfo.eventTypeId = eventTypeId
                                json.eventTypeInfo.eventTypeName = afterEventTypeName
                                con.end()
                            })
                        })
                    }
                })
            }
        }else{
            json.errormessage = "アカウントが先生以外は操作できません。"
        }
    }
    return {...json, ...auth}
}

exports.removeEventType = (accessId, sign, eventTypeId) => {
    let json = {
        status: false,
        errormessage: ''
    }
    let auth = checkAuth(accessId, sign)
    //auth.auth==falseしたら中断
    //accessアカウントは先生チェック、そうでなければ中断
    //accessアカウントはeventTypeIdにアクセス権限を調べる、なければ中断
    //該当のeventTypeを削除、status: trueにして返す
    if(auth.auth){
        if(auth.isMain){
            con = connectDatabase()
            con.connect()
            sql = `DELETE FROM eventType 
                    WHERE eventTypeId = ${eventTypeId} 
                    AND idSensei = ${auth.id}`
            con.query(sql, (err)=>{
                if(err) throw err
                con.query("COMMIT", ()=>{
                    json.status = true
                    con.end()
                })
            })
        }else{
            json.errormessage = "アカウントが先生以外は操作できません。"
        }
    }
    return {...json, ...auth}
}

exports.createEvent = (accessId, sign, info) => {
    /*
    typeof info = {
        courseName: string,
        eventName: string,
        eventTypeId: number,
        eventWeight: {
            amount: number,
            unit: string
        }
        eventTimes: {
            amount: number,
            unit: string
        }
        date: string
    }
    */
    let json = {
        status: false,
        errormessage: '',
        eventInfo: {
            eventId: 0,
            eventName: '',
            eventType: {
                eventTypeId: 0,
                eventTypeName: ''
            },
            eventWeight: {
                amount: 0,
                unit: ''
            },
            eventTimes: {
                amount: 0,
                unit: ''
            },
            date: ''
        }
    }
    let auth = checkAuth(accessId, sign)
    //auth.auth==falseしたら中断
    //accessアカウントは先生チェック、そうでなければ中断
    //新しいイベントを作成、該当情報を入れてstatus: trueにして返す
    if(auth.auth){
        if(auth.isMain){
            con = connectDatabase()
            con.connect()
            sql = `SELECT id FROM accountView WHERE idSensei = ${auth.id} AND courseName = "${info.courseName}"`
            con.query(sql, (err, result_id_seito)=>{
                if(err) throw err
                sql = `INSERT INTO event (idSeito, eventTypeId, eventName, 
                            eventWeightAmount, eventWeightUnit, 
                            eventTimesAmount, eventTimeUnit, date) 
                        VALUES(
                            ${result_id_seito[0].id}, "${info.eventTypeId}", "${info.eventName}", 
                            "${info.eventWeight.amount}", "${info.eventWeight.unit}", 
                            "${info.eventTimes.amount}", "${info.eventTimes.unit}", "${info.date}"
                        )`
                con.query(sql, (err)=>{
                    if(err) throw err
                    sql = `SELECT eventTypeName FROM eventType WHERE eventTypeId = ${info.eventTypeId}`
                    con.query(sql, (err, result)=>{
                        if(err) throw err
                        con.query("COMMIT",()=>{
                            json.eventInfo = {
                                eventId: 0,
                                eventName: info.eventName,
                                eventType: {
                                    eventTypeId: info.eventTypeId,
                                    eventTypeName: result[0].eventTypeName
                                },
                                eventWeight: {
                                    amount: info.eventWeight.amount,
                                    unit: info.eventWeight.unit
                                },
                                eventTimes: {
                                    amount: info.eventTimes.amount,
                                    unit: info.eventTimes.unit
                                },
                                date: info.date
                            }
                            json.status = true
                            con.end()
                        })
                    })
                })
            })
        }else{
            json.errormessage = "アカウントが先生以外は操作できません。"
        }
    }
    return {...json, ...auth}
}

exports.updateEvent = (accessId, sign, eventId, info) => {
    /*
    typeof info = {
        eventName: string,
        eventTypeId: number,
        eventWeight: {
            amount: number,
            unit: string
        }
        eventTimes: {
            amount: number,
            unit: string
        }
        date: string
    }
    */
    let json = {
        status: false,
        errormessage: '',
        eventInfo: {
            eventId: 0,
            eventName: '',
            eventType: {
                eventTypeId: 0,
                eventTypeName: ''
            },
            eventWeight: {
                amount: 0,
                unit: ''
            },
            eventTimes: {
                amount: 0,
                unit: ''
            },
            date: ''
        }
    }
    let auth = checkAuth(accessId, sign)
    //auth.auth==falseしたら中断
    //accessアカウントは先生チェック、そうでなければ中断
    //accessアカウントはeventIdにアクセス権限を調べる、なければ中断
    //イベントの情報を更新、該当情報を入れてstatus: trueにして返す
    if(auth.auth){
        if(auth.isMain){
            con = connectDatabase()
            con.connect()
            sql = `UPDATE event 
                    SET eventTypeId = ${info.eventTypeId},
                        eventName = "${info.eventName}",
                        eventWeightAmount = ${info.eventWeight.amount},
                        eventWeightUnit = "${info.eventWeight.unit}",
                        eventTimesAmount = ${info.eventTimes.amount},
                        eventTimesUnit = "${info.eventTimes.unit}"
                        date = "${info.date}"
                    WHERE eventId = ${eventId}`
            con.query(sql, (err)=>{
                if(err) throw err
                sql = `SELECT eventTypeName FROM eventType WHERE eventTypeId = ${info.eventTypeId}`
                con.query(sql, (err, result)=>{
                    if(err) throw err
                    con.query("COMMIT", ()=>{
                        json.eventInfo = {
                            eventId: eventId,
                            eventName: info.eventName,
                            eventType: {
                                eventTypeId: info.eventTypeId,
                                eventTypeName: result[0].eventTypeName
                            },
                            eventWeight: {
                                amount: info.eventWeight.amount,
                                unit: info.eventWeight.unit
                            },
                            eventTimes: {
                                amount: info.eventTimes.amount,
                                unit: info.eventTimes.unti
                            },
                            date: info.date
                        }
                        json.status = true
                        con.end()
                    })
                })
            })
        }else{
            json.errormessage = "アカウントが先生以外は操作できません。"
        }
    }
    return {...json, ...auth}
}

exports.events = (accessId, sign, courseName, date) => {
    let json = {
        status: false,
        errormessage: '',
        events: [
            // {
            //     eventId: 0,
            //     eventName: '',
            //     eventType: {
            //         eventTypeId: 0,
            //         eventTypeName: ''
            //     },
            //     eventWeight: {
            //         amount: 0,
            //         unit: ''
            //     },
            //     eventTimes: {
            //         amount: 0,
            //         unit: ''
            //     },
            //     date: ''
            // }
        ]
    }
    let auth = checkAuth(accessId, sign)
    //auth.auth==falseしたら中断
    //イベントリストの情報を入れてstatus: trueにして返す
    if(auth.auth){
        con = connectDatabase()
        con.connect()
        idSeito = -1
        if(auth.isMain){
            sql = `SELECT idSeito FROM accountView 
                    WHERE courseName = "${courseName}" 
                    AND idSensei = ${auth.id}`
            con.query(sql, (err, result)=>{
                if(err) throw err
                idSeito = result[0].idSeito
            })
        }else{
            idSeito = auth.id
        }
        sql = `SELECT * FROM event WHERE idSeito = ${idSeito} AND date = "${date}"`
        con.query(sql, (err, result_events)=>{
            if(err) throw err
            if(result_events.length==0){
                json.status = true
                con.end()
            }else{
                sql = `SELECT eventTypeId, eventTypeName FROM eventType WHERE `
            }
        })
    }
    return {...json, ...auth}
}

exports.removeEvent = (accessId, sign, eventId) => {
    let json = {
        status: false,
        errormessage: ''
    }
    let auth = checkAuth(accessId, sign)
    //auth.auth==falseしたら中断
    //accessアカウントは先生チェック、そうでなければ中断
    //accessアカウントはeventIdにアクセス権限を調べる、なければ中断
    //該当のイベントを削除、status: trueにして返す
    if(auth.auth){
        if(auth.isMain){
            con = connectDatabase()
            con.connect()
            sql = `DELETE FROM event WHERE eventId = ${eventId}`
            con.query(sql, (err)=>{
                if(err) throw err
                con.query("COMMIT", ()=>{
                    json.status = true
                    con.end()
                })
            })
        }else{
            json.errormessage = "アカウントが先生以外は操作できません。"
        }
    }
    return {...json, ...auth}
}

exports.logEvent = (accessId, sign, eventId, logText) => {
    let json = {
        status: false,
        errormessage: ''
    }
    let auth = checkAuth(accessId, sign)
    //auth.auth==falseしたら中断
    //accessアカウントはeventIdにアクセス権限を調べる、なければ中断
    //イベントにログしてstatus: trueにして返す
    if(auth.auth){
        con = connectDatabase()
        con.connect()
        sql = `INSERT INTO logText(eventId, id, logText) 
                VALUES (${eventId}, ${auth.id}, "${logText}")`
        con.query(sql, (err)=>{
            if(err) throw err
            con.query("COMMIT", ()=>{
                json.status = true
                con.end()
            })
        })
    }
    return {...json, ...auth}
}

exports.event = (accessId, sign, eventId) =>{
    let json = {
        status: false,
        errormessage: '',
        eventInfo: {
            eventId: 0,
            eventName: '',
            eventType: {
                eventTypeId: 0,
                eventTypeName: ''
            },
            eventWeight: {
                amount: 0,
                unit: ''
            },
            eventTimes: {
                amount: 0,
                unit: ''
            },
            date: ''
        },
        eventLogs: [
            // {
            //     logAccountName: '',
            //     logAccountUserName: '',
            //     logText: ''
            // }
        ]
    }
    let auth = checkAuth(accessId, sign)
    //auth.auth==falseしたら中断
    //accessアカウントはeventIdにアクセス権限を調べる、なければ中断
    //イベントの情報を入れてstatus: trueにして返す
    if(auth.auth){
        con = connectDatabase()
        con.connect()
        sql = `SELECT * FROM event WHERE eventId = ${eventId}`
        con.query(sql, (err, result_event)=>{
            if(err) throw err
            if(result_event.length==0){
                json.errormessage = `${eventId}での種目は見つかりません。`
                con.end()
            }else{
                sql = `SELECT eventTypeName FROM eventType WHERE eventTypeId = ${result_event.eventTypeId}`
                con.query(sql, (err, result_eventType)=>{
                    if(err) throw err
                    json.eventInfo = {
                        eventId: eventId,
                        eventName: result_event.eventName,
                        eventType: {
                            eventTypeId: 0,
                            eventTypeName: result_eventType.eventTypeName
                        },
                        eventWeight: {
                            amount: result_event.eventWeightAmount,
                            unit: result_event.eventWeightUnit
                        },
                        eventTimes: {
                            amount: result_event.eventTimesAmount,
                            unit: result_event.eventTimesUnit
                        },
                        date: result_event.date
                    }
                    sql = `SELECT logText, accountName, name FROM logText, account 
                            WHERE logText.id = account.id 
                            AND eventId = ${eventId} 
                            LEFT JOIN information USING (id) 
                            ORDER BY logTextId DESC`
                    con.query(sql, (err, result_logText)=>{
                        if(err) throw err
                        if(result_logText.length==0){
                            con.end()
                            json.status = true
                        }else{
                            result_logText.foreach(logText =>{
                                eventLog =  {
                                    logAccountName: logText.accountName,
                                    logAccountUserName: logText.name,
                                    logText: logText.logText
                                }
                                json.eventLogs.push(eventLog)
                            })
                            json.status = true
                            con.end()
                        }
                    })
                })
            }
        })
    }
    return {...json, ...auth}
}