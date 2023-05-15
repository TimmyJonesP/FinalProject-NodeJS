require('dotenv').config()

module.exports = {
    CLIENT_ID: process.env.CL_ID,
    CLIENT_SECRET: process.env.CL_SCT,
    CLIENT_URL:process.env.CL_URL,
}