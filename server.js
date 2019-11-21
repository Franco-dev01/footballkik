const express = require ('express');
const bodyPaser=require('body-parser');
const ejs = require('ejs');
const http = require('http')
const validator=require('express-validator');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const MongoStore=require('connect-mongo')(session);
const mongoose=require('mongoose');
const flash=require('connect-flash');
const passport=require('passport');
const lodash =require('lodash')



const container=require('./container')

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/footballkik');
container.resolve(function(users,_){
    const app=SetupExpress();

    function SetupExpress(){
        const app=express();
        const server=http.createServer(app);
        server.listen(3000,()=>{
            console.log('listening on port 3000');
        });
        configureExpress(app);


        //setup router

        app.use(session({
            secret:'thisasecretKey',
            resave:true,
            saveUninitialized:true,
            store:new MongoStore({mongooseConnection:mongoose.connection})
        })); 
        app.use(session());
        
        const router=require('express-promise-router')();
        users.setRouting(router);
        app.use(router);
        app.use(validator()); 
    }

    
    function configureExpress(app){
        app.use(express.static('public'));
        app.set('view engine','ejs');
     
        app.use(cookieParser());
        app.use(bodyPaser.json());
        app.use(bodyPaser.urlencoded({extended:true}));

        
        app.use(session({
            secret:'thisasecretKey',
            resave:true,
            saveUninitialized:true,
            store:new MongoStore({mongooseConnection:mongoose.connection})
        }));
        
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
        
        app.locals._=_;

    }
});

