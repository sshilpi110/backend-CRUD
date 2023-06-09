const express = require("express")
const { UserModel } = require("../model/UserModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userRouter = express.Router()


userRouter.post("/register", async (req, res) => {
    let { name, email, password } = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.send({ "msg": "something went wrong", "err": err.message })
            } else {
                const user = new UserModel({ name, email, password: hash })
                let result = await user.save()
                res.send(result)
            }
        });
    } catch (err) {
        res.send({ "msg": "something went wrong" })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = (req.body)

    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userID: user[0]._id }, 'secretkey')
                    res.send({ "msg": "Logged In", "token": token })
                } else {
                    res.send({ "msg": "wrong credentials" })

                }
            })
        } else {
            res.send({ "msg": "wrong credentials" })

        }
    } catch (err) {
        res.send({ "msg": "something went wrong", "error": err.message })
    }
})


module.exports = {
    userRouter
}