const fs = require('fs')

class fileManager{
    constructor(){}

    async loadItems(){
        if(fs.existsSync(process.cwd() + '/src/files/products.json')){
            const data = await fs.promises.readFile(
                process.cwd() + `/src/files/products.json`
            )
            const newItems = JSON.parse(data)
            console.log()
            return newItems
        }
        return "inexistente"
    }
    async save(){
        await fs.promises.writeFile()
    }
}

module.exports=fileManager