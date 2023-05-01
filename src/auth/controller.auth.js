const { Router } = require("express");
const User = require("../dao/models/User.model");

const router = Router()

router.post('/', async (req, res) => {
    try {
        const {email, password } = req.body

        const user = await User.findOne({ email })
        if(!user) 
        return res.status(400).json({status: 'error', error: "Invalid email or password",})

        if(user.password !== password)
        return res.status(400).json({status: 'error', error: "Invalid email or password",})

        req.session.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
        }

        res.json({status: 'success', message: "Session on"})

    } catch (error) {
        console.log(error)
        res.status(500).json({status: 'error', error: 'Internal Server Error'})
    }
})


module.exports = router