'use strict';

var path = require('path');

var express = require('express'),
    parser = require('body-parser');

var app = express();

var passwords = [];
var ID = 0;

function extend() {
  var args = Array.prototype.slice.call(arguments),
      acceptor = args.shift();

  args.forEach((source) => {
    Object.keys(source).forEach((key) => acceptor[key] = source[key]);
  });

  return acceptor;
}

app
  .use(parser.urlencoded({extended: true}))
  .use(parser.json())
  .use(express.static(path.join(__dirname, 'bower_components')))
  .use(express.static(path.join(__dirname, 'node_modules')))
  .use(express.static(path.join(__dirname, 'public')))

  .get('/api/passwords', (req, res) => res.json(passwords))
  .get('/api/passwords/:id',
    (req, res) => res.json(
      passwords.find(pass => pass.id === parseInt(req.params.id))
    )
  )
  .post('/api/passwords', (req, res) => {
    if (req.body) {
      req.body.id = ++ID;
      passwords = passwords.concat(req.body);
      res.json(req.body);
    } else {
      res.send({
        data: {
          error: "No data to insert"
        }
      });
    }
  })
  .put('/api/passwords/:id', (req, res) => {
    let id =  parseInt(req.params.id),
        item = passwords.find(pass => pass.id === id);

    if (item && req.body) {
      passwords.forEach((password, index) => {
        if (password.id === id) {
          passwords[index] = extend(passwords[index], req.body);
        }
      });
      res.json(req.body);
    } else if (item && !req.body) {
      res.send({
        error: "No data to update"
      });
    }
  })
  .delete('/api/passwords/:id', (req, res) => {
    let id = parseInt(req.params.id);

    if (passwords.find(pass => pass.id === id)) {
      passwords = passwords.filter(pass => pass.id !== id)

      res.send({
        data: {
          deleted: 1
        }
      });
    } else {
      res.send({
        data: {
          error: "Item does not exist"
        }
      });
    }
  })

  .get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')))
  .listen(3000, () => console.log('run'));
