var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/my_database_name';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.sendfile("index.html");
});
app.get('/home',function(req,res){
    res.sendfile("home.html");
});
app.post('/login',function(req,res){
    var user_name=req.body.name;
    var password=req.body.quote;
    if (user_name=="deon" && password=="1234"){


// Use connect method to connect to the Server
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                //HURRAY!! We are connected. :)
                console.log('Connection established to', url);

                // Get the documents collection
                var collection = db.collection('users');

                //Create some users
                var user1 = {name: user_name, age: password};


                // Insert some users
                collection.insert([user1], function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                    }
                    //Close connection
                     db.close();
                });
            }
        });
        res.redirect('/home');
    }else{
        res.end("login error");
    console.log("error")}
    console.log("User name = "+user_name+", password is "+password);
    res.end("yes");
});



app.listen(3000,function(){
    console.log("Started on PORT 3000");
})