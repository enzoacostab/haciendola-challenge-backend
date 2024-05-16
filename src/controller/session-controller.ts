import { Router } from 'express'
import { login, logout } from '../service/session-service'
import { userExtractor } from '../util/middleware'

const router = Router()
router.post('/api/login', login)
router.delete('/api/logout', userExtractor, logout)

export default router
