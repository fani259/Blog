import cloudinary from "../config/cloudinary.js"
import { handleError } from "../helpers/handleError.js"
import Blog from "../models/blog.model.js"
import Category from "../models/category.model.js"
import { encode } from "entities"

export const addBlog = async (req, res, next) => {
    try {
        const data = JSON.parse(req.body.data)
        let featuredImage = ""
        if (req.file) {
            // Upload an image
            const uploadResult = await cloudinary.uploader
                .upload(
                    req.file.path,
                    { folder: 'blog', resource_type: 'auto' }
                )
                .catch((error) => {
                    next(handleError(500, error.message))
                });
            featuredImage = uploadResult.secure_url
        }

        const blog = new Blog({
            author: data.author,
            category: data.category,
            title: data.title,
            slug: data.slug,
            featuredImage: featuredImage,
            blogContent: encode(data.blogContent)
        })

        await blog.save()


        res.status(200).json({
            success: true,
            message: "Blog Added Successfully",
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const editBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params
        const blog = await Blog.findById(blogid).populate("category", "name")
        if (!blog) {
            next(handleError(404, "Data not found."))
        }
        res.status(200).json({
            blog
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const updateBlog = async (req, res, next) => {
    try {

        const { blogid } = req.params
        const data = JSON.parse(req.body.data)
        const blog = await Blog.findById(blogid)

        blog.category = data.category
        blog.title = data.title
        blog.slug = data.slug
        blog.blogContent = encode(data.blogContent)



        let featuredImage = blog.featuredImage
        if (req.file) {
            // Upload an image
            const uploadResult = await cloudinary.uploader
                .upload(
                    req.file.path,
                    { folder: 'blog', resource_type: 'auto' }
                )
                .catch((error) => {
                    next(handleError(500, error.message))
                });
            featuredImage = uploadResult.secure_url
        }

        blog.featuredImage = featuredImage

        await blog.save()

        res.status(200).json({
            success: true,
            message: "Blog updated Successfully",
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const deleteBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params
        await Blog.findByIdAndDelete(blogid)
        res.status(200).json({
            success: true,
            message: "Blog Deleted Successfully",
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const showAllBlog = async (req, res, next) => {
    try {
        const user = req.user
        let blog;
        if (user.role === "admin") {
            blog = await Blog.find().populate("author", "name avatar role").populate("category", "name slug").sort({ createdAt: -1 }).lean().exec()
        } else {
            blog = await Blog.find({ author: user._id }).populate("author", "name avatar role").populate("category", "name slug").sort({ createdAt: -1 }).lean().exec()
        }
        res.status(200).json({
            blog
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}


export const getBlog = async (req, res, next) => {
    try {
        const { slug } = req.params
        const blog = await Blog.findOne({ slug }).populate("author", "name avatar role").populate("category", "name slug").lean().exec()
        res.status(200).json({
            blog
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}


export const getRelatedBlog = async (req, res, next) => {
    try {
        const { category, blog } = req.params;
        // console.log("Received Category Slug:", category);
        // console.log("Received Blog Slug:", blog);

        const categoryData = await Category.findOne({ slug: category });
        // console.log("Category Data Found:", categoryData);

        if (!categoryData) {
            return res.status(404).json({ message: "Category data not found" });
        }

        const categoryId = categoryData._id;
        // console.log("Searching for Related Blogs with Category ID:", categoryId);
        // console.log("Excluding Blog Slug:", blog);

        const relatedBlog = await Blog.find({
            category: categoryId,
            slug: { $ne: blog.toString().trim() } // Ensure slug is properly compared
        }).lean().exec();

        if (relatedBlog.length === 0) {
            return res.status(200).json({ message: "No related blogs found. Consider exploring other categories!" });
        }

        // console.log("Related Blogs Found:", relatedBlog);

        res.status(200).json({
            relatedBlog
        });

    } catch (error) {
        // console.error("Error Fetching Related Blogs:", error.message);
        next(handleError(500, error.message));
    }
};


export const getBlogByCategory = async (req, res, next) => {
    try {
        const { category } = req.params
        const categoryData = await Category.findOne({ slug: category })
        if (!categoryData) {
            return next(404, "Category data not found")
        }
        const categoryId = categoryData._id
        const blog = await Blog.find({ category: categoryId }).populate("author", "name avatar role").populate("category", "name slug").lean().exec()
        res.status(200).json({
            blog,
            categoryData
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const search = async (req, res, next) => {
    try {
        const { q } = req.query

        const blog = await Blog.find({ title: { $regex: q, $options: 'i' } }).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec()
        res.status(200).json({
            blog,
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}




export const getAllBlogs = async (req, res, next) => {
    try {
        const user = req.user
        const blog = await Blog.find().populate("author", "name avatar role").populate("category", "name slug").sort({ createdAt: -1 }).lean().exec()
        res.status(200).json({
            blog
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}