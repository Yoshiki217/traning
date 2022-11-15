export interface createEventType{
    auth: boolean,
    sign: string
    status: boolean,
    errormessage: string,
    eventTypeInfo: {
        eventTypeId: number,
        eventTypeName: string 
    }
}

export interface eventTypes{
    auth: boolean,
    sign: string
    status: boolean,
    errormessage: string,
    eventTypes: {
        eventTypeId: number,
        eventTypeName: string
    }[]
}

export interface changeEventTypeName{
    auth: boolean,
    sign: string
    status: boolean,
    errormessage: string,
    eventTypeinfo: {
        eventTypeId: number,
        eventTypeName: string
    }
}

export interface removeEventType{
    auth: boolean,
    sign: string
    status: boolean,
    errormessage: string
}

export interface createEvent{
    auth: boolean,
    sign: string
    status: boolean,
    errormessage: string,
    eventInfo: {
        eventId: number,
        eventName: string,
        eventType: {
            eventTypeId: number,
            eventTypeName: string
        }
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
}

export interface updateEvent{
    auth: boolean,
    sign: string
    status: boolean,
    errormessage: string,
    eventInfo: {
        eventId: number,
        eventName: string
        eventType: {
            eventTypeId: number,
            eventTypeName: string
        }
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
}

export interface events{
    auth: boolean,
    sign: string
    status: boolean,
    errormessage: string,
    events: {
        eventId: number,
        eventName: string
        eventType: {
            eventTypeId: number,
            eventTypeName: string
        }
        eventWeight: {
            amount: number,
            unit: string
        }
        eventTimes: {
            amount: number,
            unit: string
        }
        date: string
    }[]
}

export interface removeEvent{
    auth: boolean,
    sign: string
    status: boolean,
    errormessage: string
}

export interface logEvent{
    auth: boolean,
    sign: string
    status: boolean,
    errormessage: string
}

export interface event{
    auth: boolean,
    sign: string
    status: boolean,
    errormessage: string,
    eventInfo: {
        eventId: number,
        eventName: string,
        eventType: {
            eventTypeId: number,
            eventTypeName: string
        },
        eventWeight: {
            amount: number,
            unit: string
        },
        eventTimes: {
            amount: number,
            unit: string
        },
        date: string
    },
    eventLogs: {
        logAccountName: string,
        logAccountUserName: string,
        logText: string
    }[]
}