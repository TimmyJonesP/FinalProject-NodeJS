const { Router } = require('express')
const Carts = require('../dao/models/Cart.model')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const carts = await Carts.find()
        res.json({ message: carts})
    } catch (error) {
        res.json(error)
    }
})

router.post('/', async (req, res) => {
    Carts.create(req.body)
    res.json({ message: "cart created" })
})

module.exports = router