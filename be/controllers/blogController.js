const Blog = require('../models/Blog')

const getAllBlogs = async (req, res) => {
    //DO: filter search
    try {
        const blogs = await Blog.find().lean()
        if (!blogs?.length) {
            return res.status(400).json({ message: 'No blogs found' })
        }

        res.json(blogs)

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

const getBlog = async (req, res) => {
    const { id } = req.params

    try {
        const blog = await Blog.findById(id)
        if (!blog) {
            return res.status(400).json({ message: 'No blog found' })
        }

        res.json(blog)

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

const createNewBlog = async (req, res) => {
    const { title, content, category } = req.body
    if (!title || !content) {
        return res.status(400).json({ message: 'Title or Content are empty' })
    }

    try {
        const blog = await Blog.create({ title, content, category })

        if (blog) {
            res.status(201).json({ message: `New blog ${blog.title} created` })
        } else {
            res.status(400).json({ message: 'Invalid user data recieved' })
        }

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

const updateBlog = async (req, res) => {
    const { id } = req.params
    const { title, content, category } = req.body

    try {
        const blog = await Blog.findById(id)
        if (!blog) {
            return res.status(400).json({ message: 'No blog found' })
        }

        blog.title = title
        blog.content = content
        blog.category = category

        const updateBlog = await blog.save()
        res.json({ message: `${blog.title} updated` })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

const deleteBlog = async (req, res) => {
    const { id } = req.params
    
    try {

        const blog = await Blog.findById(id)
        if (!blog) {
            return res.status(400).json({ message: 'No blog found' })
        }

        await blog.deleteOne()

        res.status(202).json({ message: `Blog ${blog.title} deleted` })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }

}

module.exports = {
    getAllBlogs,
    getBlog,
    createNewBlog,
    updateBlog,
    deleteBlog
}