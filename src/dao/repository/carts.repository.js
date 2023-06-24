class CartsRepository {

    async saveProduct(cart, product) {
        try {

            const itemIndex = cart.products.findIndex(item => item.product._id.equals(product._id));
            if (itemIndex !== -1) {
                cart.products[itemIndex].quantity += 1;
            } else {
                cart.products.push({
                    product: product,
                    quantity: 1
                });
            }
            await cart.save();
        } catch (error) {
            throw error
        }
    }
}

module.exports = CartsRepository