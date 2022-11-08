export const getDateFormat = () => {
    const date = new Date()
    return dateFormat(date.getFullYear(), date.getMonth()+1, date.getDate())
}
export const dateFormat = (year: number, month: number, date: number) => {
    return `${year}-${month<10 ? `0${month}` : month}-${date<10 ? `0${date}` : date}`
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
    return dateUrl(Number(splitted[0]), Number(splitted[1]), Number(splitted[2]))
}