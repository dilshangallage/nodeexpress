var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();

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
        //console.log("login success");
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