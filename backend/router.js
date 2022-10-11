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

app.listen(8081)