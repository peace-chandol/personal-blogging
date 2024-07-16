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

        let blogHtml = ''
        for (const item of data) {
            blogHtml += `
                <div> 
                    <h2><a href="blog.html?id=${item._id}">${item.title}</a></h2>
                </div>
            `
            Blogs.push({
                id: item._id,
                title: item.title,
                content: item.content,
                category: item.category,
            })
        }
        allBlogs.innerHTML = blogHtml

    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

fetchAllBlogs('http://localhost:3000/blogs')