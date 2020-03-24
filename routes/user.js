const express = require('express')
const asyncify = require('express-asyncify')
const { sign } = require('../libs/auth')
const authMiddleware = require('../middlewares/auth')
const db = require('../db')

const api = asyncify(express.Router())
let services, User
api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
    } catch (e) {
      next(e)
    }
    User = services.User
  }
  next()
})
api.post('/signin', async (req, res, next) => {
  const { username, password } = req.body
  let result
  if (username && password) {
    try {
      result = await User.findUserByUsername(username)
      if (result) {
        if (result.password === password) {
          const { id, name, lastName } = result
          const jsonToken = { id, name, lastName }
          const data = {
            id, name, lastName,
            username,
            token: sign(jsonToken),
          }
          res.send(data)
        } else {
          res.status(401).send('password incorrect')
        }

      } else {
        res.status(404).send('username not found')
      }
    } catch (e) {
      return next(e)
    }
  } else {
    res.status(401).send('username and password required')
  }
})
api.use(authMiddleware)
// api.get('/list', (req, res) => {
//   res.send(users)
// })
// api.post('/create', (req, res) => {
//   const newUser = req.body
//   users.push(newUser)
//   res.send(users)
// })
// api.put('/update/:id', (req, res) => {
//   const { id } = req.params
//   const newData = req.body
//   users.map((user, idx) => {
//     if (user.id === parseInt(id, 10)) {
//       users[idx] = { ...user, ...newData }
//     }
//   })
//   res.send(users)
// })
// api.delete('/delete', (req, res) => {
//   const { id } = req.query
//   users.map((user, idx) => {
//     if (user.id === parseInt(id, 10)) {
//       users.splice(idx, 1)
//     }
//   })
//   res.send(users)
// })

module.exports = api
