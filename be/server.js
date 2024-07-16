require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.DATABASE_URI)

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/blogs', require('./routes/blogRoutes'))

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})