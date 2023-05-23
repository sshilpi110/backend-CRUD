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
    let { email, password } = req.body
    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    var token = jwt.sign({ course: 'backend' }, 'secretkey');
                    res.send({ "user": user, "token": token })

                } else {
                    res.send({ "msg": "something went wrong", "err": err.message })
                }
            });

        } else {
            res.send({ "msg": "wrong credentials" })
        }
    } catch (err) {
        res.send({ "msg": "something went wrong", "err": err.message })

    }

})

module.exports = {
    userRouter
}