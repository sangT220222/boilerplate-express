let express = require('express');
const req = require('express/lib/request');
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

//Getting route parameter from client 
app.get("/:word", (req,res) => {
    const  {word} = req.params;
    res.json({key: word});
})

app.get("/now", (req,res,next)=>{
    //add time of request
    req.time = new Date().toString();
    next();
}, (req,res)=>{ //mounting the middleware
    //sending/responding the time request witihin JSON body
    res.send({time: req.time});
})

app.get("/", (req,res)=>{
    // res.send("Hello Express")
    res.sendFile(filepath)
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
