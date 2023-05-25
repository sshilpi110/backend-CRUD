const express = require("express")
const { NotesModel } = require("../model/NotesModel")
const notesRouter = express.Router()


notesRouter.get("/", async (req, res) => {
    const notes = await NotesModel.find()
    res.send(notes)
})

notesRouter.post("/create", async (req, res) => {
    const note = new NotesModel(req.body)
    await note.save()
    res.send({ "msg": "notes created" })
})

notesRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body
    const id = req.params.id
    const note = await NotesModel.findOne({ "_id": id })
    const userId_in_note = note.user
    const userId_making_req = req.body.user
    try {
        if (userId_making_req !== userId_in_note) {
            res.send({ "msg": "You are not authorized !" })
        } else {
            await NotesModel.findByIdAndUpdate({ "_id": id }, payload)
            res.send("updated the note")
        }
    } catch (err) {
        console.log(err)
        res.send({ "msg": "something went wrong" })
    }




})

notesRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const note = await NotesModel.findOne({ "_id": id })
    const userId_in_note = note.user
    const userId_making_req = req.body.user
    try {
        if (userId_making_req !== userId_in_note) {
            res.send({ "msg": "You are not authorized !" })
        } else {
            await NotesModel.findByIdAndDelete({ "_id": id })
            res.send("deleted the note")
        }
    } catch (err) {
        console.log(err)
        res.send({ "msg": "something went wrong" })
    }


})

module.exports = {
    notesRouter
}

