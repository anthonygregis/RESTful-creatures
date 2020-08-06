const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

const app = express()

app.set('view engine', 'ejs') // Sets EJS as View Engine
app.use(ejsLayouts) // Enables uses of a layout template
app.use(express.urlencoded({extended: false})) // Enables body-parser middleware
app.use(methodOverride('_method')) // Allows for PUT methods from HTML Forms

app.get('/', (req, res) => {
    res.render('home')
})

app.use('/dinosaurs', require('./controllers/dinosaurRouter'))

app.use('/prehistorics', require('./controllers/prehistoricRouter'))

app.get('/errors/missingField', (req, res) => {
    let returnURL = req.query.returnURL

    res.render('errors/missingField', {returnURL: returnURL})
})

app.listen(8000, () => {
    console.log('Server running and listening on port 8000')
})