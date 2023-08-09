const chai = require('chai')
const supertest = require('supertest')
const {port} = require('../src/config/app.config')

const expect = chai.expect
const requester = supertest(`http://localhost:3000`)

let cookies;

describe('test de productos', ()=>{
    before(async function(){
        this.timeout(10000)
        try{
            const login = await requester
                .post('/api/sessions/login')
                .send({email:'adminCoder@coder.com', password: 'adminCod3r123'})
            cookies = login.headers['set-cookie']
        }catch(error){
            console.log(error)
        }
    })
    it('Se deben mostrar todos los productos: GET --> /api/products', async ()=>{
        const getProducts = await requester
            .get('/api/products')
        expect(getProducts.status).to.be.equal(200)
    });
    it('Se debe agregar un producto: POST --> /api/products', async ()=>{
        const product = {
            title: 'Producto Prueba',
            description: ':)',
            price: 123,
            thumbnail: "0",
            code: '123123',
            category: 'PC',
            status: true,
            stock: 2,
        }

        const addProduct = await requester
            .post('/api/products')
            .send(product)

        expect(addProduct.status).to.be.equal(200)
    })
})

describe('test de carrito', ()=>{
    it('Se debe traer un carrito en especifico: GET --> api/carts/:cid', async ()=>{
        const cartId = '6441a431c83c0dc02b9dc63f'
        
        const getCart = await requester
            .get(`/api/cart/${cartId}`)
        expect(getCart.status).to.be.equal(200)
    })

    it('Se debe vaciar un carrito: DELETE --> /api/carts/:cid', async()=>{
        const cartId = '6441a431c83c0dc02b9dc63f'
        const emptyCart = await requester
            .delete(`/api/cart/${cartId}`)
        expect(emptyCart.status).to.be.equal(200)
    })
})