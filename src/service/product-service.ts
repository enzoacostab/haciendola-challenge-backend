import { NextFunction, Request, Response } from 'express'
import Product from '../models/Product'

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.findAll({
      order: [['handle', 'ASC']]
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const productData = req.body

  try {
    const newProduct = await Product.create(productData)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    await Product.destroy({
      where: {
        id
      }
    })

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const newProduct = req.body

  try {
    const product = await Product.findByPk(id)

    if (!product) {
      throw new Error('Error updating blog')
    }

    product.update({ ...product, ...newProduct })
    await product.save()
    res.json(product)
  } catch (error) {
    next(error)
  }
}
