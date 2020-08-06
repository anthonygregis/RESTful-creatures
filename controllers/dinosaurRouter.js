const express = require('express');
const router = express.Router();
const fs = require('fs') // Used to read json files

router.get('/', (req, res) => {
    // Get data from dinosaurs.json
    let dinosaurs = fs.readFileSync('data/dinosaurs.json')
    // Convert data to JSON javascript
    let dinoData = JSON.parse(dinosaurs)

    // Get name query and filter dinoData
    let nameFilter = req.query.nameFilter
    if (nameFilter) {
        dinoData = dinoData.filter(aDino => aDino.name.toLowerCase() === nameFilter.toLowerCase())
    }

    //Render our dino index page and pass it the dinoData
    res.render('dinosaurs/index', {myDinos: dinoData})
})

router.get('/new', (req, res) => {
    res.render('dinosaurs/new')
})

router.get('/:id', (req, res) => {
    // Get data from dinosaurs.json
    let dinosaurs = fs.readFileSync('data/dinosaurs.json')
    // Convert data to JSON javascript
    let dinoData = JSON.parse(dinosaurs)

    let dinoIndex = parseInt(req.params.id)

    //Render our dino index page and pass it the dinoData
    res.render('dinosaurs/dino', {myDino: dinoData[dinoIndex]})
})

router.get('/edit/:id', (req, res) => {
    // Get data from prehistoric_creatures.json
    let dinosaurs = fs.readFileSync('data/dinosaurs.json')
    // Convert data to JSON javascript
    let dinosaursData = JSON.parse(dinosaurs)

    let dinosaurIndex = parseInt(req.params.id)

    res.render('dinosaurs/edit.ejs', {myDinosaur: dinosaursData[dinosaurIndex], dinosaurID: dinosaurIndex})
})

router.post('/', (req, res) => {
    // Grab Form Data
    let dinoType = req.body.type
    let dinoName = req.body.name

    // Get JSON Data and convert to JS Array of Objects
    let dinosaurs = fs.readFileSync('data/dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    if (dinoType && dinoName) {
        // Add Form Data to array and write to json file
        dinoData.push(req.body)
        fs.writeFileSync('data/dinosaurs.json', JSON.stringify(dinoData))

        // Redirect to index
        res.redirect('/dinosaurs')
    } else {
        // Redirect to error
        res.redirect('errors/missingField?returnURL=dinosaurs')
    }
})

router.put('/:id', (req, res) => {
    // Get data from prehistoric_creatures.json
    let dinosaurs = fs.readFileSync('data/dinosaurs.json')
    // Convert data to JSON javascript
    let dinosaursData = JSON.parse(dinosaurs)
    let dinosaurIndex = req.params.id

    dinosaursData[dinosaurIndex] = req.body

    fs.writeFileSync('data/dinosaurs.json', JSON.stringify(dinosaursData))

    res.redirect('/dinosaurs')
})

router.delete('/:id', (req, res) => {
    // Get data from prehistoric_creatures.json
    let dinosaurs = fs.readFileSync('data/dinosaurs.json')
    // Convert data to JSON javascript
    let dinosaursData = JSON.parse(dinosaurs)

    dinosaursData.splice(req.params.id, 1)

    fs.writeFileSync('data/dinosaurs.json', JSON.stringify(dinosaursData))

    res.redirect('/dinosaurs')
})

module.exports = router