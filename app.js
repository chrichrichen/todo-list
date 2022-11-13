const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const mongoose = require('mongoose')
require('./config/mongoose')
const PORT = process.env.PORT || 3000

const app = express()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true , useUnifiedTopology: true })





app.engine('handlebars',exphbs({defaultLayout :'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended : true}))
app.use(session({
  secret:'ThisIsMySecret',
  resave: false,
  saveUninitialized:true
}))
app.use(methodOverride('_method'))
app.use(routes)





app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})