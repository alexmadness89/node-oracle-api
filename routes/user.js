const express = require("express");

const api = express.Router();
let users = [{ id: 1, name: "alex" }, { id: 2, name: "xavier" }];

api.get("/list", (req, res) => {
  res.send(users);
});
api.post("/create", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.send(users);
});
api.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  users.map((user, idx) => {
    if (user.id === parseInt(id, 10)) {
      users[idx] = { ...user, ...newData };
    }
  });
  res.send(users);
});
api.delete("/delete", (req, res) => {
  const { id } = req.query;
  users.map((user, idx) => {
    if (user.id === parseInt(id, 10)) {
      users.splice(idx, 1);
    }
  });
  res.send(users);
});

module.exports = api;
