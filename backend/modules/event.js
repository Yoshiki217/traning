const checkAuth = require('./account').checkAuth;

exports.createEventType = (accessId, sign, ...info) => {
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
    return {...json, ...auth}
}

exports.eventTypes = (accessId, sign) => {
    let json = {
        status: false,
        errormessage: '',
        eventTypes: [
            {
                eventTypeId: 0,
                eventTypeName: ''
            }
        ]
    }
    let auth = checkAuth(accessId, sign)
    //auth.auth==falseしたら中断
    //accessアカウントは先生チェック、そうでなければ中断
    //eventTypeリストを入れてstatus: trueにして返す
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
    return {...json, ...auth}
}

exports.events = (accessId, sign, courseName, date) => {
    let json = {
        status: false,
        errormessage: '',
        events: [
            {
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
        ]
    }
    let auth = checkAuth(accessId, sign)
    //auth.auth==falseしたら中断
    //イベントリストの情報を入れてstatus: trueにして返す
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
        eventLog: [
            {
                logAccountName: '',
                logAccountUserName: '',
                logText: ''
            }
        ]
    }
    let auth = checkAuth(accessId, sign)
    //auth.auth==falseしたら中断
    //accessアカウントはeventIdにアクセス権限を調べる、なければ中断
    //イベントの情報を入れてstatus: trueにして返す
    return {...json, ...auth}
}