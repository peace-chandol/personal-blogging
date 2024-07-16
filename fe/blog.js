// Get Blog

//get params(id) query 
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const blog = document.getElementById('blog-container')

async function fetchBlog(url) {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`)
        }

        const data = await response.json()

        blog.innerHTML = `
            <div>
                <h1>${data.title}</h1>
            </div>
            <div>
                <p>${data.content}</p>
            </div>
            <div>
                <p>Category: ${data.category}</p>
            </div>
        `

    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

fetchBlog(`http://localhost:3000/blogs/${id}`)


// Delete Blog

async function deleteBlogPost(url) {
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

const deleteBtn = document.getElementById('delete-btn')
deleteBtn.addEventListener('click', () => deleteBlogPost(`http://localhost:3000/blogs/${id}`))


//Edit Blog
//DO: