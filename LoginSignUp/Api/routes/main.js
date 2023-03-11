const express = require('express')
const router = express.Router()
const data = require('../controller/main')

router.post('/register', data.register)
router.get('/getData', data.getData)
router.delete('/deleteData/:id', data.deleteData)
router.patch('/patchData/:id', data.patchData)
router.post('/login', data.login)
router.post('/addProduct', data.addProduct)
router.get('/getProduct', data.getProduct)
router.delete('/deleteList/:id', data.deleteList)
router.get('/getProductDetail/:id', data.getProductDetail)
router.put('/updateProduct/:id', data.updateProduct)

module.exports = router
