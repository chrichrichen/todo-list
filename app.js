const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const app = express()
const port = 3000



mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true , useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', ()=>{
  console.log('mongodb error!')
})

db.once('open',()=>{
  console.log('mongodb connected')
})

app.engine('handlebars',exphbs({defaultLayout :'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended : true}))
app.use(methodOverride('_method'))
app.use(routes)





app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})