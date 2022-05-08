const express = require('express')
const Note = require('../models/Note')
const Reclamation = require('../models/Reclamation')
const Teacher = require('../models/Teacher')
const User = require('../models/User')

const router = express.Router()




router.get('/:teacherSlug', async (req, res) => {
    let teacher = await Teacher.findOne({ teacherSlug: req.params.teacherSlug })
    let note = await Note.find({ codeMd: teacher.codeMd })
    res.send('teacher page ' + teacher.codeMd + '/n' + note)
})
router.get('/:teacherSlug/reclamation', async (req, res) => {
    let teacher = await Teacher.findOne({ teacherSlug: req.params.teacherSlug })
    let rec = await Reclamation.find({ codeMd: teacher.codeMd })
    res.send('teacher page ' + teacher.codeMd + '/n' + rec)
})
router.get('/:teacherSlug/:studentSlug', async (req, res) => {

    res.send('Note page ' + req.params.studentSlug)
})

router.post('/:teacherSlug/:studentSlug', async (req, res) => {
    let teacher = await Teacher.findOne({ teacherSlug: req.params.teacherSlug })
    let student = await User.findOne({ slug: req.params.studentSlug })
    let note = new Note({
        codeMd: teacher.codeMd,
        studentId: student.id,
        studentSlug: student.slug,
        score: req.body.score
    })
    note = await note.save()
    res.send('Note added ' + student.slug + '       ' + note)
})
router.put('/:teacherSlug/:studentSlug', async (req, res) => {
    let teacher = await Teacher.findOne({ teacherSlug: req.params.teacherSlug })
    let student = await User.findOne({ slug: req.params.studentSlug })
    let note = await Note.findOne({ codeMd: teacher.codeMd, studentSlug: student.slug })
    note.score = req.body.score
    note = await note.save()
    res.send('Note updated ' + student.slug + '       ' + note)
})





module.exports = router