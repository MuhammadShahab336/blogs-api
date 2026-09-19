const Post = require("../models/Post")


const get = async (req, res, next) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search?.trim() || "";
    const skip = (page - 1) * limit;
    const filter = {}

    if (search) {
        filter.$or = [
            {
                title: { $regex: search, $options: 'i' },
            },
            {
                content: { $regex: search, $options: 'i' }
            }
        ]
    }
    if (req.query.author) {
        filter.author = req.query.author
    }

    const [posts, totalPosts] = await Promise.all([
        Post.find(filter)
            .populate('author')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Post.countDocuments(filter)
    ])

    const totalPages = Math.ceil(totalPosts / limit)

    return res.status(200).json({
        success: true,
        message: "Posts fetched successfully",
        data: {
            data: posts,
            totalPosts,
            totalPages,
            currentPage: page,
            limit
        }
    })

}

const show = async (req, res, next) => {

    const post = await Post.findById(req.params.id).populate('author')

    if (!post) {
        return res.status(404).json({
            success: false,
            message: "Post not found"
        })
    }

    return res.status(200).json({
        success: true,
        message: "Post fetched successfully",
        data: post
    })

}

const add = async (req, res, next) => {

    const post = await Post.create(req.body)

    return res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: post
    })

}

const edit = async (req, res, next) => {

    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!post) {
        return res.status(404).json({
            success: false,
            message: "Post not found"
        })
    }

    return res.status(200).json({
        success: true,
        message: "Post updated successfully",
        data: post
    })

}

const remove = async (req, res, next) => {

    const post = await Post.findByIdAndDelete(req.params.id)

    if (!post) {
        return res.status(404).json({
            success: false,
            message: "Post not found"
        })
    }

    return res.status(200).json({
        success: true,
        message: "Post deleted successfully",
        data: post
    })

}

module.exports = {
    get,
    show,
    add,
    edit,
    remove
}