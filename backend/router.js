const account = require('./modules/account')
const course = require('./modules/course')
const event = require('./modules/event')
const fileupload = require('express-fileupload')
const sync = require('sync-mysql')
const express = require('express')
const app = express()
const bodyparse = require('body-parser')
const cors = require('cors')

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

app.post('/register', (req, res)=>{
    // let post=req.body
    let post = JSON.parse(req.body.json)
    console.log(post)
    res.json(account.register(post.accountName, post.password, con))
    // res.json(post)
})
app.post('/login', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(account.login(post.accountName, post.password, con))
    // res.json(post)
})

app.post('/logout', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(account.logout(post.accessId, post.sign, con))
})

app.post('/account', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(account.account(post.accessId, post.sign, con))
})

app.post('/updateInfo', (req, res)=>{
    let post = JSON.parse(req.body.json)
    const file = req.files.avatar
    const userName = post.info.userName
    const name = `${userName}_${Date.now()}.png`
    res.json(account.updateInfo(post.accessId, post.sign,
        {
            ...post.info,
            avatar: name
        }, con))
    imageUp(file, name)
})

app.post('/updateBodyParams', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(account.updateBodyParams(post.accessId, post.sign, post.info, con))
})

app.post('/removeBodyParams', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(account.removeBodyParams(post.accessId, post.sign, con))
})

app.post('/bodyParams', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(account.bodyParams(post.accessId, post.sign, post.year, post.month, con))
})

app.post('/passwordChange', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(account.passwordChange(post.accessId, post.sign, post.password, con))
})

// cource
app.post('/createCourse', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(course.createCourse(post.accessId, post.sign,
        post.courseName, post.subAccountName, post.subAccountPassword, con))
})

app.post('/removeCourse', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(course.removeCourse(post.accessId, post.sign,
        post.courseName, con))
})

app.post('/changeCourseName', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(course.changeCourseName(post.accessId, post.sign,
        post.beforeCourseName, post.afterCourseName, con))
})

//event
app.post('/createEventType', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(event.createEventType(post.accessId, post.sign, post.info, con))
})

app.post('/eventTypes', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(event.eventTypes(post.accessId, post.sign, con))
})

app.post('/changeEventTypeName', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(event.changeEventTypeName(post.accessId, post.sign,
        post.eventTypeId, post.afterEventTypeName, con))
})

app.post('/removeEventType', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(event.removeEventType(post.accessId, post.sign,
        post.eventTypeId, con))
})

app.post('/createEvent', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(event.createEvent(post.accessId, post.sign, post.info, con))
})

app.post('/updateEvent', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(event.updateEvent(post.accessId, post.sign,
        post.eventId, info, con))
})

app.post('/events', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(event.events(post.accessId, post.sign,
        post.courseName, post.date, con))
})

app.post('/removeEvent', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(event.removeEvent(post.accessId, post.sign,
        post.eventId, con))
})

app.post('/logEvent', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(event.logEvent(post.accessId, post.sign,
        post.eventId, post.logText, con))
})

app.post('/event', (req, res)=>{
    let post = JSON.parse(req.body.json)
    res.json(event.event(post.accessId, post.sign,
        post.eventId, con))
})

app.listen(8081)