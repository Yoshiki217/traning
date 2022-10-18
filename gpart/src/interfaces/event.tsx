export interface createEventType{
    status: boolean,
    errormessage: string,
    eventTypeInfo: {
        eventTypeId: number,
        eventTypeName: string 
    }
}
export interface eventTypes{
    status: boolean,
    errormessage: string,
    eventTypes: {
        eventTypeId: number,
        eventTypeName: string
    }[]
}
export interface changeEventTypeName{
    status: boolean,
    errormessage: string,
    eventTypeinfo: {
        eventTypeId: number,
        eventTypeName: string
    }
}
export interface removeEventType{
    status: boolean,
    errormessage: string
}
export interface createEvent{
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
    status: boolean,
    errormessage: string,
    events: {
        eventId: number,
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
    status: boolean,
    errormessage: string
}
export interface logEvent{
    status: boolean,
    errormessage: string
}
export interface event{
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
    eventLog: {
        logAccountName: string,
        logAccountUserName: string,
        logText: string
    }[]
}