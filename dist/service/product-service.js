"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const xlsx_1 = __importDefault(require("xlsx"));
const addProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const workbook = xlsx_1.default.readFile('./products.xlsx');
    const sheet_name_list = workbook.SheetNames;
    const data = xlsx_1.default.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    const count = yield Product_1.default.count();
    console.log(count);
    if (count === 0) {
        yield Product_1.default.bulkCreate(data);
    }
    return res.json(data);
});
exports.addProducts = addProducts;
// export const getBlogs = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     let where = {}
//     if (req.query.search) {
//       where = {
//         [Op.or]: [{
//           title: {
//             [Op.substring]: req.query.search
//           }
//         }, {
//           author: {
//             [Op.substring]: req.query.search
//           }
//         }]
//       }
//     }
//     const blogs = await Blog.findAll({
//       attributes: { exclude: ['userId'] },
//       include: [{
//         model: User,
//         attributes: ['username']
//       }, {
//         model: User,
//         as: 'readings',
//         attributes: ['id', 'username'],
//         through: {
//           attributes: []
//         }
//       }],
//       where,
//       order: [
//         ['likes', 'DESC']
//       ]
//     })
//     res.json(blogs)
//   } catch (error) {
//     next(error)
//   }
// }
// export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
//   const { title, author, url, year } = req.body
//   try {
//     const user = req.user
//     if (!title || !url) {
//       throw new Error('Missing fields')
//     }
//     const checkUrl = new URL(url)
//     if (!checkUrl) {
//       throw new Error('Invalid url')
//     }
//     const newBlog = await Blog.create({
//       userId: user!.id,
//       title,
//       author,
//       url,
//       year
//     })
//     const blogWithUser = await Blog.findByPk(newBlog.id, {
//       attributes: { exclude: ['userId'] },
//       include: [{
//         model: User,
//         attributes: ['username']
//       }, {
//         model: User,
//         as: 'readings',
//         attributes: ['id', 'username'],
//         through: {
//           attributes: []
//         }
//       }]
//     })
//     res.json(blogWithUser)
//   } catch (error) {
//     next(error)
//   }
// }
// export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
//   const { id } = req.params
//   try {
//     const blog = await Blog.findByPk(id)
//     if (!blog) {
//       return res.status(404)
//       .send({ message: 'No such blog exists.'})
//     }
//     const { userId } = blog
//     if (req.user?.id !== userId) {
//       return res.status(401).json({ error: 'authorization error' })
//     }
//     const users = await User.findAll({
//       attributes: ['likes', 'id']
//     })
//     for (const user of users) {
//       const { likes } = user
//       if (likes && likes.includes(parseInt(id))) {
//         const updatedLikes = likes.filter((blogId: number) => blogId !== parseInt(id))
//         await User.update({ likes: updatedLikes }, {
//           where: {
//             id: user.id
//           }
//         })
//       }
//     }
//     await Blog.destroy({
//       where: {
//         id
//       }
//     })
//     res.sendStatus(204)
//   } catch (error) {
//     next(error)
//   }
// }
// export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
//   const { id } = req.params
//   const { likes } = req.body
//   const userId = req.user?.id
//   try {
//     const user = await User.findByPk(userId)
//     const blog = await Blog.findByPk(id, {
//       attributes: { exclude: ['userId'] },
//       include: [{
//         model: User,
//         attributes: ['username']
//       }, {
//         model: User,
//         as: 'readings',
//         attributes: ['id', 'username'],
//         through: {
//           attributes: []
//         }
//       }]
//     })
//     if (!blog || !user) {
//       return res.status(401).json({ error: 'Error updating blog'})
//     }
//     if (user.likes) {
//       if (user.likes.includes(parseInt(id))) {
//         blog.likes = likes - 1
//         user.likes = user.likes.filter((blogId: number) => blogId !== parseInt(id))
//       } else {
//         blog.likes = likes + 1
//         user.likes = [...user.likes, parseInt(id)]
//       }
//     } else {
//       blog.likes = likes + 1
//       user.likes = [parseInt(id)]
//     }
//     await blog.save()
//     await user.save()
//     res.json(blog)
//   } catch (error) {
//     next(error)
//   }
// }
