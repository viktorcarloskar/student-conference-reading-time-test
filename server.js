"use strict";

const http = require('http');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
//const config = require('./config.json');
const pug = require('pug');

const texts = require('./content/texts.json');
const forms = require('./content/forms.json');
const pages = pageCombiner(texts, forms);

let app = express();

app.use(express.static(__dirname + '/static'))
// Setting up bodyparser for post requests
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//app.use(express.urlencoded()); // to support URL-encoded bodies

var groupNumber = 1;

let getMain = pug.compileFile('templates/main.pug');

app.get('/', function (req, res, next) {
  try {
    var html = getMain({"pages": pages, "group": groupNumber})
    res.send(html)
    groupNumber = ((groupNumber)%2)+1
  } catch (e) {
    next(e)
  }
})

app.post('/save', function (req, res, next) {
  fs.appendFile("./data/tests.txt", JSON.stringify(req.body) + "\r\n", function(err) {
    if(err)
        res.end(err);
    else
        res.end("The file was saved!");
  })
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})


function pageCombiner(texts, forms) {
  let pages = [];
  for (let i = 0; i < texts.length; i++) {
    texts[i].type = 'text';
    forms[i].type = 'form';
    pages.push(texts[i])
    pages.push(forms[i])
  }
  return pages;
}
