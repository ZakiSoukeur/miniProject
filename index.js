const express = require('express')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const studentRouter = require('./routes/students')
const teacherRouter = require('./routes/teachers')
const responsibleRouter = require('./routes/responsible')
const User = require('./models/User')
const Module = require('./models/Module')
const Note = require('./models/Note')
const app = express()
mongoose.connect('mongodb+srv://zaki:zaki@miniproject.bsvk8.mongodb.net/miniProjet?retryWrites=true&w=majority', (err) => {
    if (err) console.log(err)
    console.log('connected to DB')
})

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/student', studentRouter)
app.use('/teacher', teacherRouter)
app.use('/responsible', responsibleRouter)
const add = async () => {
    var user = new User({
        firstName: "responsible",
        lastName: "responsible",
        email: "res@gmail.com",
        password: "123",
        userType: "responsible",
    })
    user = await user.save()

}
const add2 = async () => {
    var module = new Module({
        codeMd: 'APR',
        nameMd: 'Protocole resaux'
    })
    var note = new Note({
        codeMd: 'APR',
        studentId: '625d655891717db4369f5af1',
        studentSlug: 'zaki-soukeur',
        score: '10'
    })
    module = await module.save()
    note = await note.save()

}
// add()
// add2()

app.get('/', (req, res) => {
    res.send('Hello from zaki')
})
app.post('/', async (req, res) => {
    let loginInfo = {
        email: req.body.email,
        password: req.body.password
    }
    let user = await User.findOne({ email: loginInfo.email })
    if (user) {
        if (user.password === loginInfo.password) {
            console.log(user)
            if (user.userType === 'student') res.redirect('/student/' + user.slug)
            if (user.userType === 'teacher') res.redirect('/teacher/' + user.slug)
            if (user.userType === 'responsible') res.redirect('/responsible/' + user.slug)
        } else {
            res.send('wrong password')
        }
    } else {
        res.send('User does not exist')
    }
})



app.listen(5050, () => {
    console.log('server is running on 5050 :)')
})