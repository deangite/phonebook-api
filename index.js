// Import packages
const express = require('express')
// const morgan = require('morgan')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

// App
const app = express()
// Morgan
// app.use(morgan('tiny'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// Add swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// First route
app.use(require('./routes/index.routes'))

// Starting server
app.listen(process.env.PORT || 3000, ()=>{console.log('started server in 3000')})