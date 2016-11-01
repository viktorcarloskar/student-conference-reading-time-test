const http = require('http');
const express = require('express');
//const config = require('./config.json');
const pug = require('pug');

let app = express();


app.use(express.static(__dirname + '/static'))

let getHome = pug.compileFile('templates/main.pug');

app.get('/', function (req, res, next) {
  try {
    var html = getHome({name: 'Viktor'})
    res.send(html)
  } catch (e) {
    next(e)
  }
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})
