const http = require("http");
const express = require("express");

const userRoter = require("./routes/user");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use("/user", userRoter);

server.listen("8080", () => {
  console.log(`aplicacion en ejecucion puesto 8080`);
});
