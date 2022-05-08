const express = require('express')
const Note = require('../models/Note')
const Reclamation = require('../models/Reclamation')
const User = require('../models/User')

const router = express.Router()



const url = '/:studentSlug'
router.get(url, async (req, res) => {
    let student = await User.findOne({ slug: req.params.studentSlug })
    let notes = await Note.find({ studentId: student.id })
    console.log(student.id)

    res.send('Student page ' + notes)
})
router.get(url + '/rec/:codeMd', async (req, res) => {
    let codeMd = req.params.codeMd
    let student = await User.findOne({ slug: req.params.studentSlug })
    let note = await Note.find({ studentId: student.id, codeMd: codeMd })


    res.send('reclamtion page ' + note)
})
router.post(url + '/rec/:codeMd', async (req, res) => {
    let codeMd = req.params.codeMd
    let student = await User.findOne({ slug: req.params.studentSlug })
    let note = await Note.findOne({ studentId: student.id, codeMd: codeMd })


    let reclamation = new Reclamation({
        codeMd: codeMd,
        noteId: note.id,
        studentSlug: req.params.studentSlug,
        studentId: student.id,
        details: req.body.details
    })
    reclamation = await reclamation.save()

    res.send('reclamtion saved  ' + reclamation)
})






module.exports = router