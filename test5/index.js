const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 8000
const router = require('./router/router1')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

mongoose
  .connect('mongodb://localhost:27017/hawkeye', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connect to mongodb')
  })
  .catch((err) => {
    console.log()
  })

app.listen(port, () => {
  console.log(`your app is running ${port}`)
})
