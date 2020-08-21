var bodyParser = require('body-parser');
var data = [{item: 'learn react'}, {item:'learn python'}, {item:'learn java'}]

var urlEncode = bodyParser.urlencoded({extended:false});


module.exports = function(app){

    app.get('/todo', function(req,res){
        res.render('todo', {todos : data});
    });

    app.post('/todo',urlEncode, function(req,res){
        data.push(req.body)
        console.log(req.body)
        res.json(data )
        
    });

    app.delete('/todo', function(req,res){
       
    });
};