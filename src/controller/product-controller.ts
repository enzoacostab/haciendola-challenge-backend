import { Router } from 'express'
import { getProducts, updateProduct, deleteProduct, createProduct } from '../service/product-service'
import { userExtractor } from '../util/middleware'

const router = Router()
router.get('/api/products', getProducts)
router.post('/api/products', userExtractor, createProduct)
router.put('/api/products/:id', userExtractor, updateProduct)
router.delete('/api/products/:id', userExtractor, deleteProduct)

export default router
