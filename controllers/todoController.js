var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/todoDB'

mongoose.connect(dbURL, { useNewUrlParser: true , useUnifiedTopology: true})

var todoSchema = new mongoose.Schema({
    item: String
});

var todo = mongoose.model('todo', todoSchema);

var urlEncode = bodyParser.urlencoded({extended:false});


module.exports = function(app){
    app.get('/', (req,res)=>{
        res.redirect('/todo');
    })

    app.get('/todo', function(req,res){
        todo.find({}, (err,data)=>{
            if (err){
                console.log(err)
            }else{
                res.render('todo', {todos : data});
            }
        })
        
    });

    app.post('/todo',urlEncode, function(req,res){
        
        todo.create(req.body, (err, data) =>{
            if(err){console.log(`OOPS!!! ${err}`)}
            else{
                res.json(data) 
            }
        });
        
        
    });

    app.delete('/todo/:item', function(req,res){
        
        todo.find({item: req.params.item}).deleteOne((err, data)=>{
            if(err){
                console.log(err)
            }
            else{
                
    
                res.json(data)
            } 
        });
    });
};