const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const Todo = require('./models/todo')
const usePassport = require('./config/passport')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')
const PORT = process.env.PORT || 3000

const app = express()

app.engine('handlebars',exphbs({defaultLayout :'main'}))
app.set('view engine', 'handlebars')
app.use(session({
  secret:'ThisIsMySecret',
  resave:false,
  saveUninitialized:true
}))
app.use(bodyParser.urlencoded({extended : true}))
app.use(methodOverride('_method'))
usePassport(app)
app.use((req,res,next)=>{
  console.log(req.user)

  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()

})

app.use(routes)


app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})