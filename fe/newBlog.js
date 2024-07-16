// Create Blog
async function createBlogPost(url, title, content, category) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, category })
        });

        if (!response.ok) {
            throw new Error(`Error creating post: ${response.status}`);
        }

        const data = await response.json();

        console.log('Post created successfully:', data);

        window.location.href = 'index.html'
    } catch (error) {
        console.error('Error creating post:', error);
    }
}

const title = document.getElementById('title') 
const content = document.getElementById('content') 
const category = document.getElementById('category')
const createBtn = document.getElementById('create-btn')

clearData()

const apiUrl = 'http://localhost:3000/blogs'

createBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const newTitle = title.value
    const newContent = content.value
    const newCategory = category.value
    createBlogPost(apiUrl, newTitle, newContent, newCategory)
})

function clearData() {
    title.value = ''
    content.value = ''
    category.options[0].selected = true
}