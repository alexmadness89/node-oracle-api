const http = require('http')
const express = require('express')

const authMiddleware = require('./middlewares/auth')
const userRouter = require('./routes/user')

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use('/user', userRouter)
app.use(authMiddleware)

server.listen('8080', () => {
  console.log(`aplicacion en ejecucion puesto 8080`)
})
