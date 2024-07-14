// jshint esversion:6 
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose =require("mongoose"); 
const ejs =require("ejs"); 
const session = require("express-session");
const passport =require("passport");
const passportLocalMongoose =require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate= require("mongoose-findorcreate");

const app = express();
app.set('view engine', 'ejs');
app.use( bodyParser.urlencoded({extended:"true"}));
app.use(express.static("public"));

app.use(session({
    secret:"Our little secret." ,
    resave:false,
    saveUninitialized: false ,
}));
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://localhost:27017/userDB");
const userSchema =new mongoose.Schema ({
    userName:String,
    password:String,
    googleId:String,
    secret:String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("user",userSchema);

passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture
      });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

/////////////////////////////////////// H O M E  R O U T E /////////////////////////////////////////////////////////// 
app.get("/",function(req,res){
    res.render("home");
});

/////////////////////////////////////// R E G I S T E R  R O U T E /////////////////////////////////////////////////////////// 
app.get("/register",function(req,res){
    res.render("register")
});

app.post("/register",function(req,res){

    User.register({username:req.body.username}, req.body.password , function(err,user){
        if(err){
            console.log(err);
            res.redirect("/register");
        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secrets")
            });
        };
    })     
});

/////////////////////////////////////// L O G I N  R O U T E /////////////////////////////////////////////////////////// 
app.get("/login",function(req,res){
    res.render("login");
});

app.post("/login", function(req,res){

    const user = new User({
        userName:req.body.username,
        password:req.body.password,
    });

    req.logIn(user , function(){
        
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secrets")
            });
        
        
    });

});

/////////////////////////////////////// S E C R E T S  R O U T E ///////////////////////////////////////////////////////////

app.get("/secrets",function(req,res){
    if(req.isAuthenticated()){
        User.find({"secret":{$ne: null}}).then(function(foundUsers){
            res.render("secrets" , {usersWithSecrets : foundUsers});
        });
        
    }else{
        res.redirect("/login");
    }
})

/////////////////////////////////////// L O G O U T  R O U T E ///////////////////////////////////////////////////////////
app.get("/logout", function(req,res){
    req.logOut(function(){
        res.redirect("/")
    });
    
});

/////////////////////////////////////// a U T H / G O O G L E  R O U T E //////////////////////////////////////////////////////////

app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile"] })
);

app.get("/auth/google/secrets", 
    passport.authenticate("google", { failureRedirect:" /login" }),
    function(req, res) {
      // Successful authentication, redirect secret.
      res.redirect("/secrets");
    });

/////////////////////////////////////// S U B M I T  R O U T E /////////////////////////////////////////////////////////// 
app.get("/submit",function(req,res){
    if(req.isAuthenticated()){
        res.render("submit")
    }else{
        res.redirect("/login");
    }
});

app.post("/submit", function(req,res){
    const submittedSecret = req.body.secret ;

    User.findById(req.user.id).then(function(foundUser){
        foundUser.secret = submittedSecret ;
        foundUser.save();
        res.redirect("/secrets")
    })
});

app.listen(3000,function(){
    console.log("server started on port 3000");
});