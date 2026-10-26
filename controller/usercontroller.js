const users = require('../models/userModel')
const bcrypt = require('bcrypt');
const { json } = require('express');
const jwt = require('jsonwebtoken')
// regiter logic

exports.registerController = async (req, res) => {
    console.log("inside registration logic");

    // console.log(req.body);
    const { username, email, password } = req.body
    // check email is. in db
    const exisitingUser = await users.findOne({ email })
    if (exisitingUser) {
        res.status(400).json("User already exist.. Please Login!")
    } else {
        const encryptedPassword = await bcrypt.hash(password, 10)
        const newUser = await users.create({ username, email, password: encryptedPassword })
        res.status(200).json(newUser)
    }

    // res.status(200).json("register request recieved")

}

// login logic
exports.loginController = async (req, res) => {

    const { email, password } = req.body
    const exisitingUser = await users.findOne({ email })

    if (exisitingUser) {

        const isPswdMatch = await bcrypt.compare(password, exisitingUser.password)
        if (isPswdMatch) {

            const token = jwt.sign({ userEmail: email, role: exisitingUser.role }, process.env.JWTSECRET)
            res.status(200).json({ user: exisitingUser, token })

        } else {
            res.status(409).json("Invalid Password!")
        }

    }
    else {
        res.status(409).json("invalid email...! please register")
    }

}

//google login logic
exports.googleLogin = async (req, res) => {
    console.log("inside googleLogin");
    const { username, email, password, picture } = req.body

    const exisitingUser = await users.findOne({ email })

    if (exisitingUser) {
        if (!exisitingUser.picture && picture) {
            exisitingUser.picture = picture
            await exisitingUser.save()
        }
        const token = jwt.sign({ userEmail: exisitingUser.email, role: exisitingUser.role }, process.env.JWTSECRET)
        res.status(200).json({ user: exisitingUser, token })
    }
    else {
        const encryptedPassword = await bcrypt.hash(password, 10)
        const newUser = await users.create({
            username, email, password: encryptedPassword, picture
        })
        const token = json.sign({ userEmail: newUser.email, role: newUser.role }, process.env.JWTSECRET)
        res.status(200).json({ user: newUser, token })
    }
}
//user edit
exports.userEditController = async (req, res) => {
    console.log("inside user Edit");

    console.log(req.body);
    const { username, picture, password, bio } = req.body
    console.log(req.params);
    const { id } = req.params
    console.log(req.file);
    const updatedFile = req.file ? req.file.filename : picture
    console.log(req.payload);
    if (password != "") {
        const encryptedPassword = await bcrypt.hash(password, 10)

        const updateUser = await users.findByIdAndUpdate({ _id: id }, { username, password: encryptedPassword, bio, picture: updatedFile }, { new: true })
        res.status(200).json(updateUser)
    }
    else {
        const updateUser = await users.findByIdAndUpdate({ _id: id }, { username, bio, picture: updatedFile }, { new: true })
        res.status(200).json(updateUser)
    }



    res.status(200).json("update request recieved")



}