var cors = require("cors")
const express = require('express')
const app = express()
const port = 3000
const sqlite3 = require('sqlite3').verbose();
const { select, insert, update, deleteRow} = require('./db_utilities');
const db = new sqlite3.Database('daten.sqlite');

app.use(cors(), express.json())

app.get('/', (req, res) => {
  res.send(`<h1>${new Date}</h1>`);
})
app.post('/a', async (req, res) => {
let userdaten = await select(db, 'userdaten');
let password = req.body.password
let username = req.body.username
let user_data = userdaten.filter(x => x.username == username)
if (user_data.length > 0 && password == user_data[0].password){
    res.send("passt")
}
else {
    res.status (401)
    res.send ("passt nicht")
}
})
app.post('/b', async (req, res) => {
let userdaten = await select(db, 'userdaten');
let password = req.body.password
let username = req.body.username
let email = req.body.email
if (userdaten.some(x => x.username == username)){
  res.status (401)
  res.send ("")
}
else {
  console.log("mail", email);
  await insert(db, 'userdaten', { password: password, username:username, email:email})
  res.send ("passt")
}
})
app.post('/test', async (req, res) => {
  let userdaten = await select(db, 'userdaten');
  let username = req.body.username
  if (userdaten.some(x => x.username == username)){
      res.send("passt")
  }
  else {
      res.status (401)
      res.send ("passt nicht")
  }
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// db.close();
