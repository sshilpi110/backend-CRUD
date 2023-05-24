const express = require("express")
const { NotesModel } = require("../model/NotesModel")
const notesRouter = express.Router()


notesRouter.get("/",async (req, res) => {
    const notes=await NotesModel.find()
    res.send(notes)
})

notesRouter.post("/create", async (req, res) => {
    const note = new NotesModel(req.body)
    await note.save()
    res.send({ "msg": "notes created" })
})

notesRouter.delete("/delete/:id",async (req, res) => {
    const noteID= req.params.id
    await NotesModel.findByIdAndDelete({_id:noteID})
    res.send(`msg: note with id${noteID} has been deleted`)
})

module.exports = {
    notesRouter
}

