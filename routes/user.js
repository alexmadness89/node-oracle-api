const express = require('express')
const { sign } = require('../libs/auth')
const authMiddleware = require('../middlewares/auth')

const api = express.Router()
let users = [{ id: 1, name: 'alex' }, { id: 2, name: 'xavier' }]

api.post('/signin', (req, res) => {
  const { username, password } = req.body
  if (username && password) {
    const result = {
      username,
      token: sign({ username, success: true }),
    }
    res.send(result)
  } else {
    res.status(401).send('username and password required')
  }
})
api.use(authMiddleware)
api.get('/list', (req, res) => {
  res.send(users)
})
api.post('/create', (req, res) => {
  const newUser = req.body
  users.push(newUser)
  res.send(users)
})
api.put('/update/:id', (req, res) => {
  const { id } = req.params
  const newData = req.body
  users.map((user, idx) => {
    if (user.id === parseInt(id, 10)) {
      users[idx] = { ...user, ...newData }
    }
  })
  res.send(users)
})
api.delete('/delete', (req, res) => {
  const { id } = req.query
  users.map((user, idx) => {
    if (user.id === parseInt(id, 10)) {
      users.splice(idx, 1)
    }
  })
  res.send(users)
})

module.exports = api
