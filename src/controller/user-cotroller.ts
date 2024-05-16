import { Router } from 'express'
import { createUser, getUser } from '../service/user-service'
import { userExtractor } from '../util/middleware'

const router = Router()
router.post('/api/users', createUser)
router.get('/api/users/:id', userExtractor, getUser)


export default router
