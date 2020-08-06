const express = require('express');
const router = express.Router();
const fs = require('fs') // Used to read json files

router.get('/', (req, res) => {
    // Get data from prehistoric_creatures.json
    let prehistoricCreatures = fs.readFileSync('data/prehistoric_creatures.json')
    // Convert data to JSON javascript
    let prehistoricCreaturesData = JSON.parse(prehistoricCreatures)

    // Filter list
    let nameFilter = req.query.nameFilter
    if (nameFilter) {
        prehistoricCreaturesData = prehistoricCreaturesData.filter(aCreature => aCreature.name.toLowerCase() === nameFilter.toLowerCase())
    }

    res.render('prehistorics/index', {myCreatures: prehistoricCreaturesData})
})

router.get('/new', (req, res) => {
    res.render('prehistorics/new')
})

router.get('/:id', (req, res) => {
    // Get data from prehistoric_creatures.json
    let prehistoricCreatures = fs.readFileSync('data/prehistoric_creatures.json')
    // Convert data to JSON javascript
    let prehistoricCreaturesData = JSON.parse(prehistoricCreatures)

    let prehistoricIndex = parseInt(req.params.id)

    //Render our dino index page and pass it the dinoData
    res.render('prehistorics/creature', {myCreature: prehistoricCreaturesData[prehistoricIndex]})
})

router.get('/edit/:id', (req, res) => {
    // Get data from prehistoric_creatures.json
    let prehistoricCreatures = fs.readFileSync('data/prehistoric_creatures.json')
    // Convert data to JSON javascript
    let prehistoricCreaturesData = JSON.parse(prehistoricCreatures)

    let prehistoricIndex = parseInt(req.params.id)

    res.render('prehistorics/edit.ejs', {myCreature: prehistoricCreaturesData[prehistoricIndex], creatureID: prehistoricIndex})
})

router.post('/', (req, res) => {
    // Get data from prehistoric_creatures.json
    let prehistoricCreatures = fs.readFileSync('data/prehistoric_creatures.json')
    // Convert data to JSON javascript
    let prehistoricCreaturesData = JSON.parse(prehistoricCreatures)

    let creatureName = req.body.name
    let creatureImage = req.body.img_url

    if (creatureName && creatureImage) {
        // Add Form Data to array and write to json file
        prehistoricCreaturesData.push(req.body)
        fs.writeFileSync('data/prehistoric_creatures.json', JSON.stringify(prehistoricCreaturesData))

        // Redirect to index
        res.redirect('/prehistorics')
    } else {
        console.log(req.url)
        // Redirect to error
        res.redirect('errors/missingField?returnURL=prehistorics')
    }
})

router.put('/:id', (req, res) => {
    // Get data from prehistoric_creatures.json
    let prehistoricCreatures = fs.readFileSync('data/prehistoric_creatures.json')
    // Convert data to JSON javascript
    let prehistoricCreaturesData = JSON.parse(prehistoricCreatures)
    let creatureIndex = req.params.id

    prehistoricCreaturesData[creatureIndex] = req.body

    fs.writeFileSync('data/prehistoric_creatures.json', JSON.stringify(prehistoricCreaturesData))

    res.redirect('/prehistorics')
})

router.delete('/:id', (req, res) => {
    // Get data from prehistoric_creatures.json
    let prehistoricCreatures = fs.readFileSync('data/prehistoric_creatures.json')
    // Convert data to JSON javascript
    let prehistoricCreaturesData = JSON.parse(prehistoricCreatures)

    prehistoricCreaturesData.splice(req.params.id, 1)

    fs.writeFileSync('data/prehistoric_creatures.json', JSON.stringify(prehistoricCreaturesData))

    res.redirect('/prehistorics')
})

module.exports = router