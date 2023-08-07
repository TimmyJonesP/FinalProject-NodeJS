const { Router } = require("express");
const User = require("../dao/models/User.model");
const { passwordValidate } = require("../utils/crypt.password");
const passport = require("passport");
const ErrorRepository = require("../dao/repository/error.repository");
const { error } = require("winston");

const router = Router()

router.post('/', passport.authenticate('login', { failureRedirect: 'api/sessions/faillogin' }),  async (req, res, next) => {
    try {
      if(!req.user){
        throw new ErrorRepository('Usuario o contraseña incorrectos', 404)
      }
  
      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role,
        cartId: req.user.cartId
      };  

  
      const now = new Date()
      await User.findByIdAndUpdate(req.session.user._id, { last_conection: now })
  
      req.session.save()
      console.log('Se inicio una sesion con exito', req.session.user)
      res.status(200).json({ status: 'succes', message: 'sesion establecida'})
    } catch (error) {
      console.log(error)
      next(error)
    }
  })
  
router.get('/github', passport.authenticate('github', { scope: ['user: email'] }), async (req, res) => {

})

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = req.user;
    res.redirect("/")
 })

router.get('/logout', (req, res, next) => {
    req.session.destroy(error => {
        if (error) return next(error)
        res.redirect('/api/login')
    })
})

module.exports = router