let express = require('express');
const req = require('express/lib/request');
const body_parser = require('body-parser'); 
let app = express();
//line 5 is needed for usuage of env variables
require('dotenv').config()

let filepath = __dirname + "/views/index.html";

app.use("/public",express.static(__dirname + "/public"));
//Implementation of Root-Level Request Logger Middleware
app.use(function middleware(req,res,next){
    const string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    next();
})
//The middleware to handle URL encoded data is below
app.use(body_parser.urlencoded({extended: false}));
//parse JSON data sent in the POST request
app.use(body_parser.json());

app.get("/now", (req,res,next)=>{
    //add time of request
    req.time = new Date().toString();
    next();
}, (req,res)=>{ //mounting the middleware
    //sending/responding the time request witihin JSON body
    res.send({time: req.time});
})

app.get("/name", (req,res) =>{
    var name_1 = req.query.first;
    var name_2 = req.query.last;

    res.json({ name: `${name_1} ${name_2}`});
})

app.post("/name", (req,res) => {
    var name_1 = req.body.first;
    var name_2 = req.body.last;

    res.json({name: `${name_1} ${name_2}`});
})

app.get("/", (req,res)=>{
    // res.send("Hello Express")
    res.sendFile(filepath)
})

// Getting route parameter from client 
app.get("/:word", (req,res) => {
    const  {word} = req.params;
    res.json({key: word});
})

app.get("/json", (req,res)=>{
    let message_style = process.env.MESSAGE_STYLE;
    let json_data = {"message":"Hello json"};
    if(message_style == "uppercase"){
        json_data["message"] = json_data["message"].toUpperCase();
    }else{
        json_data["message"]
    }
    res.json(json_data);
})


 module.exports = app;
