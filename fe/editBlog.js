// get params(id) query 
const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('id')
const oldTitle = urlParams.get('title')
const oldCategory = urlParams.get('category')
const oldContent = urlParams.get('content')

// Edit Blog
async function editBlog(url, title, content, category) {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, category }),
        })

        if (!response.ok) {
            throw new Error(`Error editing post: ${response.status}`)
        }

        const data = await response.json()

        console.log('Post edited successfully:', data)

        window.location.href = 'index.html'
    } catch (error) {
        console.error('Error editing post:', error);
    }
}

const editBtn = document.getElementById('save-edit-btn')
const title = document.getElementById('title')
const content = document.getElementById('content')
const category = document.getElementById('category')
editBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const newTitle = title.value
    const newContent = content.value
    const newCategory = category.value
    editBlog(`http://localhost:3000/blogs/${id}`, newTitle, newContent, newCategory)
})

function initData() {
    title.value = oldTitle || ''
    content.value = oldContent || ''
    category.value = oldCategory
}

initData()