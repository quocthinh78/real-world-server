const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require("../models/User")

router.post('/register', async (req, res) => {

    try {
        // generate password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // create User
        const newUser = await new User({
            username : req.body.username,
            email : req.body.email,
            password :hashedPassword
        })
        const user = await newUser.save();
        res.status(200).send(newUser)
    } catch (error) {
        res.status(500).json(err);
    }
})


router.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({
            email : req.body.email
        })
        !user && res.status(404).json("user not Found")
        const isValidPassword = await bcrypt.compare(req.body.password , user.password)
        !isValidPassword && res.status(400).json('wrong password')

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(err);
    }
})

module.exports = router;