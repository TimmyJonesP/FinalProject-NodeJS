const { Router } = require('express')
const Products = require('../dao/models/Protucts.model');
const uploader = require('../utils/multer.utils');
const fs = require("fs");
const fileManager = require('../dao/filemanager.dao');
const ProductsDao = require('../dao/products.dao');
const router = Router();

const FileManager = new fileManager;

const ProDao = new ProductsDao;

router.get('/', async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1; 
    const sort = req.query.sort || '-createdAt';
    const query = req.query.query || '';

    try {
        const product = await ProDao.findAll()
        res.json({message: product})
    } catch (error) {
        res.json({ message: error})
    }
});

router.get ('/loadItems', async (req, res) =>{
    try {
        const products = await FileManager.loadItems()
        const newProduct = await ProDao.createMany(products)
            res.json({message: newProduct})
    } catch (error) {
        res.json(error)
    }
})

router.post('/', uploader.single('file'), async (req, res) => {
    try {
        const {title, description, price, thumbnail, code, stock} = req.body
        const newProductInfo = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            image: req.file.filename
        }
        const newProduct = await Products.create(newProductInfo)
        res.json({message: newProduct})
    } catch (error) {
        if (error.code === 11000){
            res.status(400).json({ error: "Este producto ya esta agregado en la base de datos."})
        }
        console.log(error)
        res.status(500).json({ error: "Internal server error"})
    }
})

router.delete("/deleteAll", async (req, res) =>{
    await ProDao.deleteAll()
    res.json({message: "Doomed"})
} )
module.exports = router