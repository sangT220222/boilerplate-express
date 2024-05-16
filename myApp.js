let express = require('express');
let app = express();

let filepath = __dirname + "/views/index.html";

app.use("/public",express.static(__dirname + "/public"));

app.get("/", (req,res)=>{
    // res.send("Hello Express")
    res.sendFile(filepath)
})

app.get("/json", (req,res)=>{
    let json_data = {"message":"Hello json"};
    res.json(json_data);
})





































 module.exports = app;
