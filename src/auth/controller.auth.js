const { Router } = require("express");
const User = require("../dao/models/User.model");
const passport = require("passport");

const router = Router()

router.post('/', passport.authenticate('login', { failureRedirect: '/api/sessions/failLogin' }), async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ status: 'error', error: 'Not matches found' })
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            role: req.user.role,
            cartId: req.user.cartId
        }

        res.json({ status: 'success', message: "Session on" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 'error', error: 'Internal Server Error' })
    }
})
router.get('/github', passport.authenticate('github', { scope: ['user: email'] }), async (req, res) => {

})

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => { })

router.get('/logout', (req, res, next) => {
    req.session.destroy(error => {
        if (error) return next(error)
        res.redirect('/api/login')
    })
})

module.exports = router