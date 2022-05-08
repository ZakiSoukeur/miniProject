const express = require('express')
const Reclamation = require('../models/Reclamation')
// const Note = require('../models/Note')
const User = require('../models/User')
const xlsx = require('xlsx')
const router = express.Router()


const parse = (fname) => {
    const excelData = xlsx.readFile(fname)
    return Object.keys(excelData.Sheets).map((name) => ({
        name,
        data: xlsx.utils.sheet_to_json(excelData.Sheets[name]),
    }))
}

router.get('/:responsibleSlug', async (req, res) => {

    let users = await User.find({ userType: 'student' })
    parse('./pvtest.xlsx').forEach(e => {
        console.log(e.data)
    })
    res.send('responsible page ' + users)
})
router.get('/:responsibleSlug/reclamation', async (req, res) => {

    let recs = await Reclamation.find()

    res.send('reclamation page ' + recs)
})
router.get('/:responsibleSlug/new', async (req, res) => {

    res.send('Add a new student ')
})

router.post('/:responsibleSlug/new', async (req, res) => {

    let student = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        userType: 'student'
    })
    student = await student.save()
    res.send('Student added ' + student)

})

router.put('/:responsibleSlug/student/:studentSlug', async (req, res) => {

    let student = await User.findOne({ slug: req.params.studentSlug })
    let s = req.body
    student.firstName = s.firstName ? s.firstName : student.firstName;
    student.lastName = s.lastName ? s.lastName : student.lastName;
    student.email = s.email ? s.email : student.email;
    student.password = s.password ? s.password : student.password;

    student = await student.save()

    res.send('Student updated ' + student)

})


router.delete('/:responsibleSlug/student/:studentSlug', async (req, res) => {
    let note = await Note.delete({ studentSlug: req.params.studentSlug })
    let student = await User.deleteOne({ slug: req.params.studentSlug })


    res.send('Student deleted  with notes ' + note)

})







module.exports = router