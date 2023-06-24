const passport = require("passport");
const local = require("passport-local");
const User = require("../dao/models/User.model");
const { passwordValidate } = require("../utils/crypt.password");
const GithubStrategy = require('passport-github2')
const LocalStrategy = local.Strategy
const { CLIENT_ID, CLIENT_SECRET, CLIENT_URL } = require('../config/passport.secret')

const initializePassport = () => {
    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
        try {
            const { first_name, last_name, email, age, password } = req.body
            const user = await User.findOne({ email: username })
            if (user) {
                console.log('User V')
                return done(null, false)
            }
            const newUserInfo = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
            }
            const newUser = await User.create(newUserInfo);
            done(null, newUser)
        } catch (error) {
            done(error)
        }
    }))
    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await User.findOne({ email: username })
            if (!user) {
                console.log('User not found')
                return done(null, false)
            }

            if (!passwordValidate(password, user)) return done(null, false);

            done(null, user)
        } catch (error) {
            done(error)
        }
    }
    )
    )
    passport.use('github', new GithubStrategy({
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: CLIENT_URL,
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile)
            const user = await User.findOne({ email: profile._json.email })

            if (!user) {
                const newUserInfo = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: 18,
                    email: profile._json.email,
                    password: ''
                }
                const newUser = await User.create(newUserInfo)
                return done(null, newUser)
            }
            done(null, user)
        } catch (error) {
            done(error)
        }
    })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id)
        done(null, user)
    })
}

module.exports = initializePassport