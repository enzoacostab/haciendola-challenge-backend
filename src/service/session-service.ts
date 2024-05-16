import User from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ActiveSession from '../models/ActiveSessions'
import config from '../util/config'
import { Request, Response, NextFunction } from 'express'

const { SECRET } = config

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({
      where: {
        email
      }
    })

    const alreadyLogged = await ActiveSession.findOne({
      include: {
        model: User,
        where: {
          email
        }
      }
    })

    const passwordCorrect = user
      ? await bcrypt.compare(password, user?.passwordHash)
      : false

    if (!user || !passwordCorrect) {
      throw new Error('The email or password is incorrect')
    }

    if (alreadyLogged) {
      res.json({ id: alreadyLogged.userId, token: alreadyLogged.token })
    }

    const userForToken = {
      email,
      id: user.id
    }
    const token = jwt.sign(userForToken, SECRET!)

    await ActiveSession.create({
      token,
      userId: user.id
    })

    res.json({ token, id: user.id })
  } catch (error) {
    next(error)
  }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user

    if (!user) {
      throw new Error('User not authenticated')
    }

    await ActiveSession.destroy({
      where: {
        userId: user.id
      }
    })

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}
