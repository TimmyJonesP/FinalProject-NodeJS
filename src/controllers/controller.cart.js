const { Router } = require('express')
const Carts = require('../models/Cart.model')

const router = Router()

router.get('/', async (req, res) => {
    res.json({ message: "hi carts" })
})

router.post('/', async (req, res) => {
    Carts.create(req.body)
    res.json({ message: "cart created" })
})

module.exports = router