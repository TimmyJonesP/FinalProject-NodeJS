const express = require('express')
const handlebars = require('express-handlebars')
const mongoConnect = require('../db')
const router = require('./router')
const session = require('express-session');


const app = express()


app.use(session({
    secret: 'admin123',
    resave: false,
    saveUninitialized: false
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')

mongoConnect()
router(app)

module.exports = app