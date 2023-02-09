const account = require('./modules/account')
const course = require('./modules/course')
const event = require('./modules/event')
const fileupload = require('express-fileupload')
const sync = require('sync-mysql')
const express = require('express')
const app = express()
const cors = require('cors')

const http = require('http')
const server = http.createServer(app)
const {Server} = require("socket.io")

const con = new sync({
    host: 'localhost',
    user: 'projectg',
    password: 'fitness',
    database: 'customerdb'
})

// app.use(bodyparse.json())
// app.use(bodyparse.urlencoded({
//     extended: true
// }))
app.use(cors())
app.use(fileupload())
app.use(express.static('public'))
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket)=>{
    socket.emit('hello')
})

app.post('/', (req, res)=>{
    res.json(
        {
            javascript: 'this is javascript'
        }
    )
})

const imageUp = (file, name) => {
    file.mv(__dirname+'/public/'+name)
}

const searchPost = (post, indents) => {
    if(indents == null || indents == undefined){
        indents = Object.keys(post)
    }
    for(let indent of indents){
        let obj = post[indent]
        if(obj == null || obj == '' || obj == undefined){
            return false
        }
    }
    return true
}
app.post('/register', (req, res)=>{
    // let post=req.body
    let post = JSON.parse(req.body.json)
    // console.log(post)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    res.json(account.register(post.accountName, post.password, con))
    // res.json(post)
})
app.post('/login', (req, res)=>{
    let post = JSON.parse(req.body.json)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    res.json(account.login(post.accountName, post.password, con))
    // res.json(post)
})

app.post('/logout', (req, res)=>{
    let post = JSON.parse(req.body.json)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    res.json(account.logout(post.accessId, post.sign, con))
})

app.post('/account', (req, res)=>{
    let post = JSON.parse(req.body.json)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    res.json(account.account(post.accessId, post.sign, con))
})

app.post('/updateInfo', (req, res)=>{
    let post = JSON.parse(req.body.json)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    if(req.files){
        const file = req.files.avatar
        const userName = post.info.userName
        const name = `${userName}_${Date.now()}.png`
        res.json(account.updateInfo(post.accessId, post.sign,
            {
                ...post.info,
                avatar: name
            }, con))
        imageUp(file, name)
    } else {
        res.json(account.updateInfo(post.accessId, post.sign,
            {
                ...post.info
            }, con))
    }
})

app.post('/updateBodyParams', (req, res)=>{
    let post = JSON.parse(req.body.json)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    res.json(account.updateBodyParams(post.accessId, post.sign, post.courseName , post.info, con))
})

app.post('/removeBodyParams', (req, res)=>{
    let post = JSON.parse(req.body.json)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    res.json(account.removeBodyParams(post.accessId, post.sign, post.courseName, post.date, con))
})

app.post('/bodyParams', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(account.bodyParams(post.accessId, post.sign, post.courseName, post.year, post.month, con))
})

app.post('/passwordChange', (req, res)=>{
    let post = JSON.parse(req.body.json)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    res.json(account.passwordChange(post.accessId, post.sign, post.password, con))
})

app.post('/chatInbox', (req, res)=>{
    let post = JSON.parse(req.body.json)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    let ret = account.chatInbox(post.accessId, post.sign, post.courseName, post.text, con)
    res.json(ret)
    if(ret.auth && ret.status){
        for(let name of ret.accountNames){
            io.sockets.emit(name)
        }
    }
})

app.post('/chatHistory', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(account.chatHistory(post.accessId, post.sign, post.courseName, post.limit, con))
})

app.post('/chatRealtime', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(account.chatRealtime(post.accessId, post.sign, post.courseName, post.chatId, con))
})

// cource
app.post('/createCourse', (req, res)=>{
    let post = JSON.parse(req.body.json)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    res.json(course.createCourse(post.accessId, post.sign,
        post.courseName, post.subAccountName, post.subAccountPassword, con))
})

app.post('/removeCourse', (req, res)=>{
    let post = JSON.parse(req.body.json)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    res.json(course.removeCourse(post.accessId, post.sign,
        post.courseName, con))
})

app.post('/changeCourseName', (req, res)=>{
    let post = JSON.parse(req.body.json)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    res.json(course.changeCourseName(post.accessId, post.sign,
        post.beforeCourseName, post.afterCourseName, con))
})

//event
app.post('/createEventType', (req, res)=>{
    let post = JSON.parse(req.body.json)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    console.log(post.info)
    res.json(event.createEventType(post.accessId, post.sign, post.info, con))
})

app.post('/eventTypes', (req, res)=>{
    let post = JSON.parse(req.body.json)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    res.json(event.eventTypes(post.accessId, post.sign, con))
})

app.post('/changeEventTypeName', (req, res)=>{
    let post = JSON.parse(req.body.json)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    res.json(event.changeEventTypeName(post.accessId, post.sign,
        post.eventTypeId, post.afterEventTypeName, con))
})

app.post('/removeEventType', (req, res)=>{
    let post = JSON.parse(req.body.json)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    res.json(event.removeEventType(post.accessId, post.sign,
        post.eventTypeId, con))
})

app.post('/createEvent', (req, res)=>{
    let post = JSON.parse(req.body.json)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    res.json(event.createEvent(post.accessId, post.sign, post.info, con))
})

app.post('/updateEvent', (req, res)=>{
    let post = JSON.parse(req.body.json)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    res.json(event.updateEvent(post.accessId, post.sign,
        post.eventId, post.info, con))
})

app.post('/eventsByMonth', (req, res)=>{
    let post = JSON.parse(req.body.json)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    res.json(event.eventsByMonth(post.accessId, post.sign, post.courseName, post.year, post.month, con))
})

app.post('/events', (req, res)=>{
    let post = JSON.parse(req.body.json)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    res.json(event.events(post.accessId, post.sign,
        post.courseName, post.date, con))
})

app.post('/removeEvent', (req, res)=>{
    let post = JSON.parse(req.body.json)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    res.json(event.removeEvent(post.accessId, post.sign,
        post.eventId, con))
})

app.post('/logEvent', (req, res)=>{
    let post = JSON.parse(req.body.json)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    res.json(event.logEvent(post.accessId, post.sign,
        post.eventId, post.logText, con))
})

app.post('/event', (req, res)=>{
    let post = JSON.parse(req.body.json)
    if(!searchPost(post)){
        res.json({auth: post.accessId, sign: post.sign, status: false, errormessage: "データ入力されていません"})
        return
    }
    res.json(event.event(post.accessId, post.sign,
        post.eventId, con))
})

// io.sockets.on("sendMessage", (json)=>{
//     let post = JSON.parse(json)
//     let req = account.chatInbox(post.accessId, post.sign, post.courseName, post.text, con)
//     if(req.auth && req.status){
        
//     }
// })

server.listen(8081)