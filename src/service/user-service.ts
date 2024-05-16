import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import bcrypt from 'bcrypt'

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll()

    if (!users) {
      return res.status(401).json({ message: "No user found" })
    }

    res.json(users)
  } catch (error) {
    next(error)
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const where: any = {}

  if (req.query.read) {
    where.read = req.query.read === 'true'
  }

  try {
    const { id } = req.params
    const user = await User.findByPk(id)

    if (!user) {
      throw new Error("User not found");
    }

    res.json(user)
  } catch (error) {
    next(error)
  }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body

  try {
    const checkUsername = await User.findOne({
      where: {
        email
      }
    })

    if (checkUsername) throw new Error('An account with this email already exists')

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      email,
      passwordHash
    })

    res.json(user)
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.params
  const newEmail = req.body.email

  try {
    const user = await User.findOne({
      where: {
        email
      }
    })

    if(!user) {
      throw new Error("User not found")
    }

    user.email = newEmail
    await user.save()
    res.json(user)
  } catch (error) {
    next(error)
  }
}
