const express = require('express')
const handlebars = require('express-handlebars')
const mongoConnect = require('../db')
const router = require('./router')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { dbMongo } = require("../src/config/db.config");
const cookieParser = require('cookie-parser');
const initializePassport = require('./config/passport.config');
const passport = require('passport');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express')


const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static(__dirname + '/public'))

app.use(
    session({
        store: MongoStore.create({
            mongoUrl:
            dbMongo,
            mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        }),
        secret: 'coderSecret',
        resave: false,
        saveUninitialized: false,
}));

const swaggerOptions = {
    definition:{
        openapi: '3.0.1',
        info: {
            title: "Documentacion de la API",
            description: "Documentacion de Endpoints",
        },
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
}
const specs = swaggerJSDoc(swaggerOptions)
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())




app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')

mongoConnect()
router(app)

module.exports = app