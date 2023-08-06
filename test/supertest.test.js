const chai = require('chai')
const supertest = require('supertest')
const {port} = require('../src/config/app.config')

const expect = chai.expect
const requester = supertest(`http://localhost:${port}`)

let cookies;

describe('test de productos', ()=>{
    before(async function(){
        this.timeout(10000)
        try{
            const login = await requester
                .post('/api/login')
                .send({email:'sandrocarioli43@gmail.com' ,password: 'admin123'})
            cookies = login.headers['newCookie']
        }catch(error){
            console.log(error)
        }
    })
    it('Se deben mostrar todos los productos: GET --> /api/products', async ()=>{
        const getProducts = await requester
            .get('/api/products')
            .set('Cookie', cookies)
        expect(getProducts.status).to.be.equal(200)
    });
    it('Se debe agregar un producto: POST --> /api/products', async ()=>{
        const product = {
            title: 'Producto Prueba',
            description: ':)',
            price: 123,
            stock: 2,
            category: 'PC',
            code: '123123',
            owner: 'user'
        }

        const addProduct = await requester
            .post('/api/products')
            .send(product)
            .set('Cookie', cookies)
        expect(addProduct.status).to.be.equal(201)
    })
    it('Se debe actualizar un producto: PATCH --> /api/products/:pid', async ()=>{
        const product = {
            title: 'Patch',
            description: 'se va a actualizar',
            price: 1,
            stock:1,
            category: 'gráfica',
            code: 'pc1',
            owner: 'user'
        }

        const addProduct = await requester
            .post('/api/products')
            .send(product)
            .set('Cookie', cookies)
        
        const prodId = addProduct.body.message._id
        const updateProductInfo = {
            title: 'nombre nuevo',
            description: 'descripcion nueva',
            prince: 2,
            stock: 2,
        }

        const updateProduct = await requester
            .patch(`/api/products/${prodId}`)
            .send(updateProductInfo)
            .set('Cookie', cookies)
        expect(updateProduct.status).to.be.equal(200)
    })    
})

describe('test de carrito', ()=>{
    it('Se debe traer un carrito en especifico: GET --> api/carts/:cid', async ()=>{
        const cartId = '64bebf231e09a3a7c46c0b98'
        
        const getCart = await requester
            .get(`/api/carts/${cartId}`)
            .set('Cookie', cookies)
        expect(getCart.status).to.be.equal(200)
    })

    it('Se debe vaciar un carrito: DELETE --> /api/carts/:cid', async()=>{
        const emptyCart = await requester
            .delete(`/api/carts/${cartId}`)
            .set('Cookie', cookies)
        expect(emptyCart.status).to.be.equal(200)
    })
})