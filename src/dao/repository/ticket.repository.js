const Products = require("../models/Products.model");
const Tickets = require("../models/Ticket.model");
const ErrorRepository = require("./error.repository");

class TicketsRepository {


    async processDataTicket(code, userEmail, cart) {


        const processedProducts = []
        const unprocessedProducts = []
        let totalAmount = 0


        for (let i = 0; i < cart.products.length; i++) {
            const item = cart.products[i];


            const product = await this.processItem(item, processedProducts, unprocessedProducts)
            if (product) {
                const productQuantity = item.quantity;
                const productTotalPrice = product.price * productQuantity;
                totalAmount += productTotalPrice;
            }
        }



        cart.products = cart.products.filter((item) => !processedProducts.some((processedItem) => processedItem._id.toString() === item.product._id.toString()));
        await cart.save();

        const ticket = await Tickets.create({
            code: code,
            purchase_datetime: Date.now(),
            amount: totalAmount,
            purchaser: userEmail,
            processProducts: processedProducts
        });

        return {
            ticket: ticket,
            unprocessedProducts: unprocessedProducts
        }
    }

    async processItem(item, processedProducts, unprocessedProducts) {
        const productId = item.product._id;
        const productQuantity = item.quantity


        try {
            const product = await Products.findById(productId);

            if (productQuantity <= product.stock) {
                product.stock -= productQuantity;
                await product.save();
                processedProducts.push(product);
                return product
            } else {
                unprocessedProducts.push(product);
            }
        } catch (error) {
            throw error
        }
    }
}


module.exports = TicketsRepository