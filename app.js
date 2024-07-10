const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});


app.post("/",function(req,res){
    const query = req.body.cityName;
    const apikey = "15ee497b0946dd871ca91d49a2e44e30";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature in " + query + " is " + temperature + " degrees Celsius.</h1>");
            res.write("<p>The weather description is " + description + ".</p>");
            res.write("<img src = " + imgurl + "></img>")
            res.send();
        });
    });
});





app.listen(3000,function(){
    console.log("Server is running on port 3000");
});

