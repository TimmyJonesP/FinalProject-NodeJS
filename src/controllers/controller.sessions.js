const { Router } = require('express');
const User = require('../dao/models/User.model');
const privateAccess = require('../middlewares/privateAccess.middleware');
const publicAccess = require('../middlewares/publicAccess.middleware');
const { createHash } = require('../utils/crypt.password');
const passport = require('passport');

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

router.post('/signup', passport.authenticate("register", {failureRedirect: '/api/sessions/failureRegister'}),  async (req, res) => {
    try {
        res.status(201).json({ status: 'success', message: newUser });
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
});
router.get('/', privateAccess, (req, res) => {
    const {user} = req.session
    res.render("user.handlebars", { user })
})

router.get('/failureRegister', async (req, res)  => {
    console.log('Failed strategy')
    res.json({error: 'Failed Register'})
})

module.exports = router