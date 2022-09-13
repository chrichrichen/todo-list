const express = require('express')

const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')
const port = 3000

const app = express()






app.engine('handlebars',exphbs({defaultLayout :'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended : true}))
app.use(methodOverride('_method'))
app.use(routes)





app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})