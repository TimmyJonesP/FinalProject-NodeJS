const passport = require('passport')
const local = require('passport-local')
const GithubStrategy = require('passport-github2')
const { hashPassword, isValidPassword } = require('../utils/crypt.password')
const User = require('../dao/models/User.model')
const usersCreate = require('../dao/users.dao')
const { CLIENT_ID, CLIENT_SECRET, CLIENT_URL } = require('../config/passport.secret')
const LocalStrategy = local.Strategy

const initializePassport = () => {
	passport.use(
    'register',
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, username, password, done) => {
        try {
          const {first_name,last_name,email,age,password} = req.body
          const user = await User.findOne({ email: username })
          if (user) {
            console.log('Usuario ya existe')
            return done(null, false)
          }

          const hashedPassword = hashPassword(password)
          const userInfo = {
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword
          }

          const newUser = await usersCreate(userInfo)

          done(null, newUser)
        } catch (error) {
          done(error)
        }
      }
    )
  )

  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email' },
      async (username, password, done) => {

        try {
          const user = await User.findOne({ email: username })
          if (!user) return done(null, false)
          if (!isValidPassword(password, user)) return done(null, false)


          done(null, user)
        } catch (error) {
          return done(error)
        }
      }
    )
  )

  passport.use(
    'github',
    new GithubStrategy(
      {
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: CLIENT_URL,
      },
      async ( accessToken, refreshToken,profile, done) => {
        try {
          const user = await User.findOne({ email: profile._json.email })
          if(!user){
            const userInfo = {
              first_name: profile._json.name,
              last_name: '',
              age: 18,
              email: profile._json.email,
              password: '',
            }
            const newUser = await usersCreate(userInfo)
            return done(null, newUser)
          }
          done(null, user)
        } catch (error) {
          done(error)
        }
      }
    )
  )

  passport.serializeUser((newUser, done) => {
    const userId = newUser.id
    done(null, userId)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id)
      done(null, user)
    } catch (error) {
      done(error)
    }
  })
}

module.exports = initializePassport