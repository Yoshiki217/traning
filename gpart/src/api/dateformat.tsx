export const getDateFormat = () => {
    const date = new Date()
    return dateFormat(date.getFullYear(), date.getMonth()+1, date.getDate())
}
export const dateFormat = (year: number, month: number, date?: number) => {
    let ym =  `${year}-${month<10 ? `0${month}` : month}`
    let mdate = date == undefined || date == null ? `-01` : `-${date<10 ? `0${date}` : date}`
    return ym+mdate
}
export const dateUrl = (year: number, month: number, date: number) => {
    return {
        year: String(year),
        month: `${month<10 ? `0${month}` : month}`,
        date: `${date<10 ? `0${date}` : date}`
    }
}
export const formatToUrl = (format: string) => {
    const splitted = format.split("-")
    const obj = dateUrl(Number(splitted[0]), Number(splitted[1]), Number(splitted[2]))
    return `${obj.year}/${obj.month}/${obj.date}`
}

export const monthData = (year: number, month: number): {date: number, day: number, thisMonth: -1|0|1, format: string}[] => {
    const list: {date: number, day: number, thisMonth: -1|0|1, format: string}[] = [

    ]
    const finalDate = (new Date(year, month, 0))
    const firstDate = (new Date(year, month-1, 1))
    for(let i = firstDate.getDay(); i>=1; i--){
        const obj = new Date(year, month-1, 1-i)
        list.push({
            date: obj.getDate(),
            day: obj.getDay(),
            thisMonth: -1,
            format: dateFormat(obj.getFullYear(), obj.getMonth()+1, obj.getDate())
        })
    }
    for(let i = 1; i<=finalDate.getDate(); i++){
        const obj = new Date(year, month-1, i)
        list.push({
            date: obj.getDate(),
            day: obj.getDay(),
            thisMonth: 0,
            format: dateFormat(obj.getFullYear(), obj.getMonth()+1, obj.getDate())
        })
    }
    for(let i = 1; i<=6-finalDate.getDay(); i++){
        const obj = new Date(year, month-1, finalDate.getDate()+i)
        list.push({
            date: obj.getDate(),
            day: obj.getDay(),
            thisMonth: 1,
            format: dateFormat(obj.getFullYear(), obj.getMonth()+1, obj.getDate())
        })
    }
    return list
}

export const calendarData = (year: number, month: number): {date: number, day: number, thisMonth: -1|0|1, format: string}[][] => {
    const list: {date: number, day: number, thisMonth: -1|0|1, format: string}[][] = []
    let count = -1
    const datas = monthData(year, month)
    for(let data of datas){
        if(data.day==0){
            list.push([])
            count++
        }
        list[count].push(data)
    }
    console.log(list)
    return list
}