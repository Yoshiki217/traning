const account = require('./modules/account')
const course = require('./modules/course')
const event = require('./modules/event')
const express = require('express')
const app = express()
const bodyparse = require('body-parser')

app.use(bodyparse.json())
// app.use(bodyparse.urlencoded({
//     extended: true
// }))

const cors = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
}

app.post('/register', (req, res)=>{
    cors(res)
    let post=req.body
    res.json(account.register(post.accountName, post.password))
    // res.json(post)
})
app.post('/login', (req, res)=>{
    cors(res)
    let post = req.body
    res.json(account.login(post.accountName, post.password))
})

app.post('/logout', (req, res)=>{
    cors(res)
    let post = req.body
    res.json(account.logout(post.accessId, post.sign))
})

app.post('/account', (req, res)=>{
    cors(res)
    let post = req.body
    res.json(account.account(post.accessId, post.sign))
})

app.post('/updateInfo', (req, res)=>{
    cors(res)
    let post = req.body
    let info = JSON.parse(post.info)
    res.json(account.updateInfo(post.accessId, post.sign,
        post.accountName, info))
})

// cource
app.post('/createCourse', (req, res)=>{
    cors(res)
    let post = req.body
    res.json(account.removeCourse(post.accessId, post.sign,
        post.courseName, post.subAccountUserName))
})

app.post('/removeCourse', (req, res)=>{
    cors(res)
    let post = req.body
    res.json(account.removeCourse(post.accessId, post.sign,
        post.courseName))
})

app.post('/changeCourseName', (req, res)=>{
    cors(res)
    let post = req.body
    res.json(account.changeCourseName(post.accessId, post.sign,
        post.beforeCourseName, post.afterCourseName))
})

//event
app.post('/createEventType', (req, res)=>{
    cors(res)
    let post = req.body
    let info = JSON.parse(post.info)
    res.json(account.createEventType(post.accessId, post.sign, info))
})

app.post('/eventType', (req, res)=>{
    cors(res)
    let post = req.body
    res.json(account.eventType(post.accessId, post.sign))
})

app.post('/changeEventTypeName', (req, res)=>{
    cors(res)
    let post = req.body
    res.json(account.changeEventTypeName(post.accessId, post.sign,
        post.eventTypeId, post.afterEventTypeName))
})

app.post('/removeEventType', (req, res)=>{
    cors(res)
    let post = req.body
    res.json(account.removeEventType(post.accessId, post.sign,
        post.eventTypeId))
})

app.post('/createEvent', (req, res)=>{
    cors(res)
    let post = req.body
    let info = JSON.parse(post.info)
    res.json(account.createEvent(post.accessId, post.sign, info))
})

app.post('/updateEvent', (req, res)=>{
    cors(res)
    let post = req.body
    let info = JSON.parse(post.info)
    res.json(account.updateEvent(post.accessId, post.sign,
        post.eventId, info))
})

app.post('/events', (req, res)=>{
    cors(res)
    let post = req.body
    res.json(account.events(post.accessId, post.sign,
        post.coursename, post.date))
})

app.post('/removeEvent', (req, res)=>{
    cors(res)
    let post = req.body
    res.json(account.removeEvent(post.accessId, post.sign,
        post.eventId))
})

app.post('/logEvent', (req, res)=>{
    cors(res)
    let post = req.body
    res.json(account.logEvent(post.accessId, post.sign,
        post.eventId, logText))
})

app.post('/event', (req, res)=>{
    cors(res)
    let post = req.body
    res.json(account.event(post.accessId, post.sign,
        post.eventId))
})

app.listen(8081)