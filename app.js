//require express and body-parser
var express = require('express');
var todoController = require('./controllers/todoController')

var app = express();



//set up template engine

app.set('view engine','ejs');

//setup static
app.use(express.static('./public'))

// fire controller 
todoController(app);



//listen to port
app.listen(3000, function(){
    console.log("port active");
})
