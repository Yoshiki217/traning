const checkAuth = require('./account').checkAuth;

exports.createEventType = (accessId, sign, info, con) => {
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
    let auth = checkAuth(accessId, sign, con)
    //auth.auth==falseしたら中断
    //accessアカウントは先生チェック、そうでなければ中断
    //eventTypeを作成して、情報を入れてstaus: trueにして返す
    if(auth.auth){
        if(auth.isMain){
            let r_eventTypeName = con.query(`SELECT eventTypeName FROM eventType WHERE idSensei = ${auth.id}`)
            let flag = true
            for(i=0 ; i<r_eventTypeName.length ; i++){
                if(r_eventTypeName[i].eventTypeName == info.eventTypeName){
                    json.errormessage = `${info.eventTypeName}の種目類名は既に登録されています。`
                    flag = false
                    break
                }
            }
            if(flag){
                con.query("SELECT 1 FROM eventType LIMIT 1 FOR UPDATE")
                let r_insert_into_eventType = con.query(`INSERT INTO eventType(idSensei, eventTypeName) 
                                                        VALUES (${auth.id},"${info.eventTypeName}")`)
                con.query("COMMIT")
                json.eventTypeInfo.eventTypeId = r_insert_into_eventType.insertId
                json.eventTypeInfo.eventTypeName = info.eventTypeName
                json.status = true
            }
        }
        else{
            json.errormessage = "アカウントが先生以外は操作できません。"
        }
    }
    return {...json, ...auth}
}

exports.eventTypes = (accessId, sign, con) => {
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
    let auth = checkAuth(accessId, sign, con)
    //auth.auth==falseしたら中断
    //accessアカウントは先生チェック、そうでなければ中断
    //eventTypeリストを入れてstatus: trueにして返す
    if(auth.auth){
        if(auth.isMain){
            let r_eventType = con.query(`SELECT eventTypeId, eventTypeName FROM eventType 
                    WHERE idSensei = ${auth.id}`)
            // if(r_eventType.length==0){
            //     json.errormessage = "このアカウントは種目類まだ作成していません。"
            // }
            // else{
                r_eventType.forEach(et =>{
                    json.eventTypes.push({
                        eventTypeId: et.eventTypeId,
                        eventTypeName: et.eventTypeName
                    })
                })
                json.status = true
            // }
        }
        else{
            json.errormessage = "アカウントが先生以外は操作できません。"
        }
    }
    return {...json, ...auth}
}

exports.changeEventTypeName = (accessId, sign, eventTypeId, afterEventTypeName, con) => {
    let json = {
        status: false, 
        errormessage: '',
        eventTypeInfo: {
            eventTypeId: 0,
            eventTypeName: ''
        }
    }
    let auth = checkAuth(accessId, sign, con)
    //auth.auth==falseしたら中断
    //accessアカウントは先生チェック、そうでなければ中断
    //accessアカウントはeventTypeIdにアクセス権限を調べる、なければ中断
    //該当のeventType名を更新、新しい情報を入れて返す
    if(auth.auth){
        if(auth.isMain){
            let r_eventTypeName = con.query(`SELECT eventTypeName FROM eventType 
                    WHERE idSensei = ${auth.id} 
                    AND eventTypeId = ${eventTypeId}`)
            if(afterEventTypeName == r_eventTypeName[0].eventTypeName){
                json.errormessage = "新の種目類名は元の種目類名と同じです。"
            }
            else{
                con.query("SELECT 1 FROM eventType LIMIT 1 FOR UPDATE")
                con.query(`UPDATE eventType SET eventTypeName = "${afterEventTypeName}" 
                        WHERE idSensei = ${auth.id} 
                        AND eventTypeId = ${eventTypeId}`)
                con.query("COMMIT")
                json.status = true
                json.eventTypeInfo.eventTypeId = eventTypeId
                json.eventTypeInfo.eventTypeName = afterEventTypeName
            }
        }
        else{
            json.errormessage = "アカウントが先生以外は操作できません。"
        }
    }
    return {...json, ...auth}
}

exports.removeEventType = (accessId, sign, eventTypeId, con) => {
    let json = {
        status: false,
        errormessage: ''
    }
    let auth = checkAuth(accessId, sign, con)
    //auth.auth==falseしたら中断
    //accessアカウントは先生チェック、そうでなければ中断
    //accessアカウントはeventTypeIdにアクセス権限を調べる、なければ中断
    //該当のeventTypeを削除、status: trueにして返す
    if(auth.auth){
        if(auth.isMain){
            con.query("SELECT 1 FROM eventType LIMIT 1 FOR UPDATE")
            con.query(`DELETE FROM eventType 
                    WHERE eventTypeId = ${eventTypeId} 
                    AND idSensei = ${auth.id}`)
            con.query("COMMIT")
            json.status = true
        }
        else{
            json.errormessage = "アカウントが先生以外は操作できません。"
        }
    }
    return {...json, ...auth}
}

exports.createEvent = (accessId, sign, info, con) => {
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
            // eventId: 0,
            // eventName: '',
            // eventType: {
            //     eventTypeId: 0,
            //     eventTypeName: ''
            // },
            // eventWeight: {
            //     amount: 0,
            //     unit: ''
            // },
            // eventTimes: {
            //     amount: 0,
            //     unit: ''
            // },
            // date: ''
        }
    }
    let auth = checkAuth(accessId, sign, con)
    //auth.auth==falseしたら中断
    //accessアカウントは先生チェック、そうでなければ中断
    //新しいイベントを作成、該当情報を入れてstatus: trueにして返す
    if(auth.auth){
        if(auth.isMain){
            let r_id_seito = con.query(`SELECT id FROM accountView WHERE idSensei = ${auth.id} AND courseName = "${info.courseName}"`)
            con.query("SELECT 1 FROM event LIMIT 1 FOR UPDATE")
            let r_insert_into_event = con.query(`INSERT INTO event (idSeito, eventTypeId, eventName, 
                eventWeightAmount, eventWeightUnit, 
                eventTimesAmount, eventTimesUnit, date) 
            VALUES(
                ${r_id_seito[0].id}, "${info.eventTypeId}", "${info.eventName}", 
                "${info.eventWeight.amount}", "${info.eventWeight.unit}", 
                "${info.eventTimes.amount}", "${info.eventTimes.unit}", "${info.date}"
            )`)
            con.query("COMMIT")

            let r_eventTypeName = con.query(`SELECT eventTypeName FROM eventType WHERE eventTypeId = ${info.eventTypeId}`)
            json.eventInfo = {
                eventId: r_insert_into_event.insertId,
                eventName: info.eventName,
                eventType: {
                    eventTypeId: info.eventTypeId,
                    eventTypeName: r_eventTypeName[0].eventTypeName
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
        }
        else{
            json.errormessage = "アカウントが先生以外は操作できません。"
        }
    }
    return {...json, ...auth}
}

exports.updateEvent = (accessId, sign, eventId, info, con) => {
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
            // eventId: 0,
            // eventName: '',
            // eventType: {
            //     eventTypeId: 0,
            //     eventTypeName: ''
            // },
            // eventWeight: {
            //     amount: 0,
            //     unit: ''
            // },
            // eventTimes: {
            //     amount: 0,
            //     unit: ''
            // },
            // date: ''
        }
    }
    let auth = checkAuth(accessId, sign, con)
    //auth.auth==falseしたら中断
    //accessアカウントは先生チェック、そうでなければ中断
    //accessアカウントはeventIdにアクセス権限を調べる、なければ中断
    //イベントの情報を更新、該当情報を入れてstatus: trueにして返す
    if(auth.auth){
        if(auth.isMain){
            con.query("SELECT 1 FROM event LIMIT 1 FOR UPDATE")
            con.query(`UPDATE event 
                    SET eventTypeId = ${info.eventTypeId},
                        eventName = "${info.eventName}",
                        eventWeightAmount = ${info.eventWeight.amount},
                        eventWeightUnit = "${info.eventWeight.unit}",
                        eventTimesAmount = ${info.eventTimes.amount},
                        eventTimesUnit = "${info.eventTimes.unit}"
                        date = "${info.date}"
                    WHERE eventId = ${eventId}`)
            con.query("COMMIT")

            let result = con.query(`SELECT eventTypeName FROM eventType WHERE eventTypeId = ${info.eventTypeId}`)
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
        }
        else{
            json.errormessage = "アカウントが先生以外は操作できません。"
        }
    }
    return {...json, ...auth}
}

exports.events = (accessId, sign, courseName, date, con) => {
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
    let auth = checkAuth(accessId, sign, con)
    //auth.auth==falseしたら中断
    //イベントリストの情報を入れてstatus: trueにして返す
    if(auth.auth){
        let idSeito = -1
        if(auth.isMain){
            idSeito = con.query(`SELECT id FROM accountView 
                                WHERE courseName = "${courseName}" 
                                AND idSensei = ${auth.id}`)[0].id
        }
        else{
            idSeito = auth.id
        }
        let r_events = con.query(`SELECT e1.eventId, e1.eventName, et2.eventTypeId, 
                                         et2.eventTypeName, e1.eventWeightAmount, 
                                         e1.eventWeightUnit, e1.eventTimesAmount, 
                                         e1.eventTimesUnit, DATE_FORMAT(e1.date, '%Y-%m-%d') as date 
                                  FROM event e1, eventType et2  
                                  WHERE e1.eventTypeId = et2.eventTypeId 
                                  AND e1.idSeito = ${idSeito} 
                                  AND e1.date = "${date}"`)
        if(r_events.length!=0){
            r_events.forEach(e=>{
                json.events.push({
                        eventId: e.eventId,
                        eventName: e.eventName,
                        eventType: {
                            eventTypeId: e.eventTypeId,
                            eventTypeName: e.eventTypeName
                        },
                        eventWeight: {
                            amount: e.eventWeightAmount,
                            unit: e.eventWeightUnit
                        },
                        eventTimes: {
                            amount: e.eventTimesAmount,
                            unit: e.eventTimesUnit
                        },
                        date: e.date
                })
            })
        }
        json.status = true
    }
    return {...json, ...auth}
}

exports.removeEvent = (accessId, sign, eventId, con) => {
    let json = {
        status: false,
        errormessage: ''
    }
    let auth = checkAuth(accessId, sign, con)
    //auth.auth==falseしたら中断
    //accessアカウントは先生チェック、そうでなければ中断
    //accessアカウントはeventIdにアクセス権限を調べる、なければ中断
    //該当のイベントを削除、status: trueにして返す
    if(auth.auth){
        if(auth.isMain){
            con.query("SELECT 1 FROM event LIMIT 1 FOR UPDATE")
            con.query(`DELETE FROM event WHERE eventId = ${eventId}`)
            con.query("COMMIT")
            json.status = true
        }
        else{
            json.errormessage = "アカウントが先生以外は操作できません。"
        }
    }
    return {...json, ...auth}
}

exports.logEvent = (accessId, sign, eventId, logText, con) => {
    let json = {
        status: false,
        errormessage: ''
    }
    let auth = checkAuth(accessId, sign, con)
    //auth.auth==falseしたら中断
    //accessアカウントはeventIdにアクセス権限を調べる、なければ中断
    //イベントにログしてstatus: trueにして返す
    if(auth.auth){
        con.query("SELECT 1 FROM logText LIMIT 1 FOR UPDATE")
        con.query(`INSERT INTO logText(eventId, id, logText) 
                VALUES (${eventId}, ${auth.id}, "${logText}")`)
        con.query("COMMIT")
        json.status = true
    }
    return {...json, ...auth}
}

exports.event = (accessId, sign, eventId, con) =>{
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
    let auth = checkAuth(accessId, sign, con)
    //auth.auth==falseしたら中断
    //accessアカウントはeventIdにアクセス権限を調べる、なければ中断
    //イベントの情報を入れてstatus: trueにして返す
    if(auth.auth){
        let r_event = con.query(`SELECT e1.eventId, e1.eventName, et2.eventTypeId, 
                                        et2.eventTypeName, e1.eventWeightAmount, 
                                        e1.eventWeightUnit, e1.eventTimesAmount, 
                                        e1.eventTimesUnit, DATE_FORMAT(e1.date, '%Y-%m-%d') as date 
                                FROM event e1, eventType et2  
                                WHERE e1.eventTypeId = et2.eventTypeId 
                                AND e1.eventId = ${eventId}`)
        if(r_event.length==0){
            json.errormessage = `${eventId}での種目は見つかりません。`
        }
        else{
            json.eventInfo = {
                eventId: r_event[0].eventId,
                eventName: r_event[0].eventName,
                eventType: {
                    eventTypeId: r_event[0].eventTypeId,
                    eventTypeName: r_event[0].eventTypeName
                },
                eventWeight: {
                    amount: r_event[0].eventWeightAmount,
                    unit: r_event[0].eventWeightUnit
                },
                eventTimes: {
                    amount: r_event[0].eventTimesAmount,
                    unit: r_event[0].eventTimesUnit
                },
                date: r_event[0].date
            }
            let r_eventLogs = con.query(`SELECT logText, accountName, name 
                    FROM logText, account  
                    LEFT JOIN information USING (id) 
                    WHERE logText.id = account.id 
                    AND eventId = ${r_event[0].eventId}
                    ORDER BY logTextId DESC`)
            if(r_eventLogs.length!=0){
                r_eventLogs.forEach(logText =>{
                    json.eventLogs.push({
                        logAccountName: logText.accountName,
                        logAccountUserName: logText.name,
                        logText: logText.logText
                    })
                })
            }
            json.status = true
        }
    }
    return {...json, ...auth}
}