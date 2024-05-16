import ActiveSession from '../models/ActiveSessions'
import { Response, NextFunction, Request, RequestHandler } from 'express'
import User from '../models/User'

declare module 'express' {
  interface Request {
    user?: User
  }
}

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  res.status(500).json({ error: error.message })

  next(error)
}

export const userExtractor: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.get('authorization')
  
  if (token && token.startsWith('Bearer ')) {
    try {
      const session = await ActiveSession.findOne({
        include: {
          model: User
        },
        where: {
          token: token.substring(7)
        }
      })
      
      req.user = session?.user
    } catch (error) {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }

  next()
}
