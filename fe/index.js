// Get All Blogs
const allBlogs = document.getElementsByClassName('all-blogs')[0]

let Blogs = []

async function fetchAllBlogs(url) {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`)
        }

        const data = await response.json()

        createBlogsArray(data)
        createBlogHtml(Blogs)

    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

fetchAllBlogs('http://localhost:3000/blogs')

function createBlogHtml(blogsData) {
    let blogHtml = ''
    for (const item of blogsData) {
        blogHtml += `
        <div> 
        <h2><a href="blog.html?id=${item.id}">${item.title}</a></h2>
        <p>Category: ${item.category}</p>
        </div>
        <hr>
        `
    }
    allBlogs.innerHTML = blogHtml
}

function createBlogsArray(blogsData) {
    for (const item of blogsData) {
        Blogs.push({
            id: item._id,
            title: item.title,
            content: item.content,
            category: item.category,
        })
    }
}

// Filter Category
const categoryFilter = document.getElementById('category-filter')

categoryFilter.addEventListener('change', (e) => {
    if (e.target.value === 'All') {
        createBlogHtml(Blogs)
        return
    }
    const newBlog = Blogs.filter(item => {
        return item.category === e.target.value
    })
    createBlogHtml(newBlog)
})