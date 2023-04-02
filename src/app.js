const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port =process.env.PORT || 3000

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        college:'',
        name: 'Prabhat'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'PRABHAT KUMAR',
        college:'NIT kurukshetra',
        name: 'Prabhat'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'If you are not getting response please put proper ladmark with detail and retry',
        title: 'Help',
        college:'',
        name: 'Prabhat'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }= {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address:req.query.address
    // })



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
    
        name: 'Prabhat',
        errorMessage: 'Help article  not found .'


    })
})



app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
    
        name: 'Prabhat',
        errorMessage: 'page not found .'


    })
})



app.listen(port, () => {
    console.log('Server is up on port '+port)
})