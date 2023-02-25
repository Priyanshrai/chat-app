const http = require("http");

const express = require("express");
const fs = require("fs");
const app = express();

const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

app.get("/",(req,res,next)=>{
    res.send("<h1>Group Chat App</h2><a href='/login'>Login</a>")
})

app.get("/login",(req,res,next)=>{
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/login" method="POST"><label for="Username">Username</label><input id="username" type="text" name="username"><button type="submit">Submit</button></form>')
})
app.post("/login",(req,res,next)=>{
    // localStorage.setItem("USERNAME",JSON.stringify(req.body.username))
    res.redirect("/chat")
})
app.get("/chat",(req, res, next)=>{
    res.send('<form onsubmit="document.getElementById(`username`).value = localStorage.getItem(`username`)"  action="/chat" method="post"><input id="username" type="hidden" name="username"><label for="message">message</label><input type="text" name="message"><button type="submit">Send</button></form>')

})
app.post("/chat",(req,res,next)=>{
    const message = req.body.message;
    const username =req.body.username;
    fs.appendFile("chat.txt",` ${username}:${message} `, function(err){
        if(err){
            console.log(err);
        }
    })
    fs.readFile('chat.txt', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      });
})
app.listen(3000, () => {
  console.log("server is started at 3000");
});
