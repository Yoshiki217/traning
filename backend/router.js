const account = require('./modules/account')
const course = require('./modules/course')
const event = require('./modules/event')
const express = require('express')
const app = express()
const bodyparse = require('body-parser')
const cors = require('cors')

app.use(bodyparse.json())
app.use(bodyparse.urlencoded({
    extended: true
}))
app.use(cors())

app.post('/', (req, res)=>{
    res.json(
        {
            javascript: 'this is javascript'
        }
    )
})

app.post('/register', (req, res)=>{
    let post=req.body
    res.json(account.register(post.accountName, post.password))
    // res.json(post)
})
app.post('/login', (req, res)=>{
    let post = req.body
    res.json(account.login(post.accountName, post.password))
    // res.json(post)
})

app.post('/logout', (req, res)=>{
    let post = req.body
    res.json(account.logout(post.accessId, post.sign))
})

app.post('/account', (req, res)=>{
    let post = req.body
    res.json(account.account(post.accessId, post.sign))
})

app.post('/updateInfo', (req, res)=>{
    let post = req.body
    let info = JSON.parse(post.info)
    res.json(account.updateInfo(post.accessId, post.sign,
        post.accountName, info))
})

// cource
app.post('/createCourse', (req, res)=>{
    let post = req.body
    res.json(course.createCourse(post.accessId, post.sign,
        post.courseName, post.subAccountName))
})

app.post('/removeCourse', (req, res)=>{
    let post = req.body
    res.json(course.removeCourse(post.accessId, post.sign,
        post.courseName))
})

app.post('/changeCourseName', (req, res)=>{
    let post = req.body
    res.json(course.changeCourseName(post.accessId, post.sign,
        post.beforeCourseName, post.afterCourseName))
})

//event
app.post('/createEventType', (req, res)=>{
    let post = req.body
    let info = JSON.parse(post.info)
    res.json(event.createEventType(post.accessId, post.sign, info))
})

app.post('/eventType', (req, res)=>{
    let post = req.body
    res.json(event.eventTypes(post.accessId, post.sign))
})

app.post('/changeEventTypeName', (req, res)=>{
    let post = req.body
    res.json(event.changeEventTypeName(post.accessId, post.sign,
        post.eventTypeId, post.afterEventTypeName))
})

app.post('/removeEventType', (req, res)=>{
    let post = req.body
    res.json(event.removeEventType(post.accessId, post.sign,
        post.eventTypeId))
})

app.post('/createEvent', (req, res)=>{
    let post = req.body
    let info = JSON.parse(post.info)
    res.json(event.createEvent(post.accessId, post.sign, info))
})

app.post('/updateEvent', (req, res)=>{
    let post = req.body
    let info = JSON.parse(post.info)
    res.json(event.updateEvent(post.accessId, post.sign,
        post.eventId, info))
})

app.post('/events', (req, res)=>{
    let post = req.body
    res.json(event.events(post.accessId, post.sign,
        post.coursename, post.date))
})

app.post('/removeEvent', (req, res)=>{
    let post = req.body
    res.json(event.removeEvent(post.accessId, post.sign,
        post.eventId))
})

app.post('/logEvent', (req, res)=>{
    let post = req.body
    res.json(event.logEvent(post.accessId, post.sign,
        post.eventId, logText))
})

app.post('/event', (req, res)=>{
    let post = req.body
    res.json(event.event(post.accessId, post.sign,
        post.eventId))
})

app.listen(8081)