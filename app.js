// jshint esversion:6 
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose =require("mongoose"); 
const ejs =require("ejs"); 
const bcrypt = require("bcrypt");
const saltRounds = 10;


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:"true"}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userDB");
const userSchema =new mongoose.Schema ({
    email:String,
    password:String
});




const User = mongoose.model("user",userSchema);

/////////////////////////////////////// H O M E  R O U T E /////////////////////////////////////////////////////////// 
app.get("/",function(req,res){
    res.render("home");
});

/////////////////////////////////////// R E G I S T E R  R O U T E /////////////////////////////////////////////////////////// 
app.get("/register",function(req,res){
    res.render("register")
});

app.post("/register",function(req,res){
    bcrypt.hash(req.body.password , saltRounds ,function(err,hash){
        const newUser = new User({
        email:req.body.username,
        password: hash
        });

        newUser.save().then(function(){
        res.render("secrets");
        }); 
    });
    
     
});

/////////////////////////////////////// L O G I N  R O U T E /////////////////////////////////////////////////////////// 
app.get("/login",function(req,res){
    res.render("login");
});

app.post("/login", function(req,res){
    const userName = req.body.username;
    const password = req.body.password;

    User.findOne({email:userName}).then(function(foundUser){
        
        bcrypt.compare(password, foundUser.password,function(err ,result){
            if(result === true){
                res.render("secrets")
            }
        });
        
    });
});


app.listen(3000,function(){
    console.log("server started on port 3000");
});