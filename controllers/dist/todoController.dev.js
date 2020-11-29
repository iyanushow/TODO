"use strict";

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todoDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var todoSchema = new mongoose.Schema({
  item: String
});
var todo = mongoose.model('todo', todoSchema);
var urlEncode = bodyParser.urlencoded({
  extended: false
});

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/todo');
  });
  app.get('/todo', function (req, res) {
    todo.find({}, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.render('todo', {
          todos: data
        });
      }
    });
  });
  app.post('/todo', urlEncode, function (req, res) {
    todo.create(req.body, function (err, data) {
      if (err) {
        console.log("OOPS!!! ".concat(err));
      } else {
        res.json(data);
      }
    });
  });
  app["delete"]('/todo/:item', function (req, res) {
    todo.find({
      item: req.params.item
    }).deleteOne(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
  });
};