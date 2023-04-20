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
    try {
        
    } catch (error) {
        
    }
    Carts.create(req.body)
    res.json({ message: "cart created" })
})

router.get('/:cid', async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}) 

router.put('/:cid', async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

router.post('/:cid/product/p:pid', async (req,res) => {
    try {
        
    } catch (error) {
        
    }
})

router.put('/:cid/product/:pid', async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

router.delete('/:cid', async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

router.delete('/:cid/product/:pid', async (req, res) => {

})
module.exports = router