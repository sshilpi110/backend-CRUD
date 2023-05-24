
const mongoose=require("mongoose")

const notesSchema=mongoose.Schema({
    title:String,
    body:String,
    user:String
})

const NotesModel=mongoose.model("notes",notesSchema)

module.exports={
    NotesModel
}