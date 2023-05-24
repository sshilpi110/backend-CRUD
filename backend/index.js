const express = require("express")
const { connection } = require("./db")
const {userRouter} =require("./routes/userRouter")
const {notesRouter}=require("./routes/noteRoute")
const {authenticate} =require("./middleware/authanticate.middleware")
const cors=require("cors")
const app = express()

app.use(express.json())
app.use(cors())
app.use("/user",userRouter)
app.use(authenticate)
app.use("/notes",notesRouter)

app.get("/", (req, res) => {
    res.send("api is working")
})

app.listen(5500, async () => {
    try {
        await connection
        console.log("connected to db")
    } catch (err) {
        console.log(err.message)
    }
    console.log("server is running at port 5500")
})
