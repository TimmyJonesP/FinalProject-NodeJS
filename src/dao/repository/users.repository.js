const User = require('../models/User.model')
const Carts = require('../models/Cart.model')

class UserRepository {

    async createUser(userInfo) {
        try {
            const { first_name, last_name, email, age, password } = userInfo
            let role = 'usuario'
            const cart = new Carts()
            await cart.save()
            const cartId = cart._id

            const newUserInfo = {
                first_name,
                last_name,
                email,
                age,
                password,
                role,
                cartId,
            }
            const user = await User.create(newUserInfo)
            return user
        } catch (error) {
            throw error
        }
    }
}

module.exports = UserRepository