const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
const { parse } = require("path");

app.get("/",function(req,response){
    response.sendFile(__dirname+"/index.html");});
    
app.post("/",function(req,response){
    
const query=req.body.cityName;
const apiKey="2829c1d8600e695b71c5bdbf5ea64b54";
const url="https://api.openweathermap.org/data/2.5/weather?units=metric&appid="+apiKey+"&q="+query+"&units=metric"
https.get(url,function(res){
    console.log(res.statusCode);
    res.on("data",function(data){
        const weatherData=JSON.parse(data);
       console.log(weatherData);
       const temp=weatherData.main.temp;
       const weatherDescription=weatherData.weather[0].description;
       const icon=weatherData.weather[0].icon;
       const iconURL=" http://openweathermap.org/img/wn/"+icon+"@2x.png"
       
       response.write('<head><meta charset="utf-8"></head>');
       response.write("<h1>Temperature in "+ query+ " is "+temp+" degrees Celsius</h1>");
       response.write("<h1>The weather is currently "+weatherDescription+"</h1>");
       response.write("<img src="+iconURL+">");
       response.send();
    
})
 
     

    })})
    

        
    
   

app.listen(3000,function(){
    console.log("Working");
})
// const Me={
//     name: "Sherry",
//     nickname:"Berry"
// }
// JSON.stringify(Me);
// the opposite of parse (Json to string)