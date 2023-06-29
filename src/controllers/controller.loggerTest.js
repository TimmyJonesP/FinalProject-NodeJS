const { Router } = require('express')
const logger = require('../config/logger.config')
const router = Router()

router.get('/', (req, res) => {
    logger.debug('Test message - Debug')
    logger.info('Test message - Info')
    logger.warning('Test message - Warning')
    logger.error('Test message - Error')
    
    res.send('Prueba de logs exitosa')
})

module.exports = router