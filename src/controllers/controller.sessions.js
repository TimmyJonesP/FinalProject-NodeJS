const { Router } = require('express');
const User = require('../dao/models/User.model');
const privateAccess = require('../middlewares/privateAccess.middleware');
const publicAccess = require('../middlewares/publicAccess.middleware');

const router = Router()

router.get('/signup', publicAccess, async (req, res) => {
    res.render("index.handlebars")
})

router.get('/login', publicAccess, async (req, res) => {
    res.render('login.handlebars')
});
router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) return res.json({error})
        res.redirect('/login')
    })
} )

router.post('/signup', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body
        const newUserInfo = {
            first_name,
            last_name,
            email,
            age,
            password
        }
        const newUser = await User.create(newUserInfo)
        res.status(201).json({ status: 'success', message: newUser });
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
});
router.get('/', privateAccess, (req, res) => {
    const {user} = req.session
    res.render("user.handlebars", { user })
})


module.exports = router