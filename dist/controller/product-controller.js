"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_service_1 = require("../service/product-service");
const router = (0, express_1.Router)();
// router.get('/api/blogs', getBlogs)
// router.post('/api/blogs', userExtractor, createBlog)
// router.put('/api/blogs/:id', userExtractor, updateBlog)
// router.delete('/api/blogs/:id', userExtractor, deleteBlog)
router.get('/api/add', product_service_1.addProducts);
exports.default = router;
