const app = require("./app")
const {port} = require("./config/app.config")

app.listen(port, () =>{
    console.log(`server running at port ${port}`)
})