const express = require('express')
const morgan = require('morgan')
const routes = require('./routes/')
const app = express()

app.use(morgan())
app.use(routes)


app.listen(8080)
