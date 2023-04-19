const { Router } = require('express')
const Products = require('../models/Protucts.model')

const router = Router()

router.get('/', async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1; 
    const sort = req.query.sort || '-createdAt';
    const query = req.query.query || '';
})

router.post('/', async (req, res) => {
    Products.create(req.body)
})

module.exports = router