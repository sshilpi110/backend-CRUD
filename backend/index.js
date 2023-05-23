const express = require("express")
const { connection } = require("./db")
const {userRouter} =require("./routes/userRouter")
const app = express()

app.use(express.json())
app.use("/user",userRouter)

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
