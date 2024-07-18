// get params(id) query 
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Get Blog
const btnContainer = document.getElementsByClassName('btn-container')[0]
const blogContent = document.getElementById('blog-content')
const blogTitle = document.getElementById('blog-title')

async function fetchBlog(url) {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`)
        }

        const data = await response.json()

        setBlogTitle(data)
        setBtnContent(data)
        setBlogContent(data)

    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

fetchBlog(`http://localhost:3000/blogs/${id}`)

function setBlogTitle(data) {
    blogTitle.innerHTML = `
            <h1>${data.title}</h1>
            <p>${data.category}</p>
    `
}

function setBlogContent(data) {
    blogContent.innerHTML = `
        <div>
            <p>${data.content}</p>
        </div>

    `
}

function setBtnContent(data) {
    btnContainer.innerHTML = `
        <button onclick="location.href='editBlog.html?id=${id}&title=${data.title}&category=${data.category}&content=${data.content}'">Edit</button>
        <button id="delete-btn">Delete</button>
        `
        const deleteBtn = document.getElementById('delete-btn')
        deleteBtn.addEventListener('click', () => {
            deleteBlog(`http://localhost:3000/blogs/${id}`)
        })
}


// Delete Blog
async function deleteBlog(url) {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error deleting post: ${response.status}`)
        }

        console.log('Post deleted successfully')

        window.location.href = 'index.html'
    } catch (error) {
        console.error('Error deleting post:', error)
    }
}