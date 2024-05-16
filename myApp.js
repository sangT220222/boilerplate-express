let express = require('express');
let app = express();

let filepath = __dirname + "/views/index.html";

app.use("/public",express.static(__dirname + "/public"));

app.get("/", (req,res)=>{
    // res.send("Hello Express")
    res.sendFile(filepath)
})




































 module.exports = app;
