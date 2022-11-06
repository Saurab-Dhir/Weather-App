const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){

  res.sendFile(__dirname+"/index.html")

});

app.post("/", function(req,res){

  const query = req.body.cityName;
  const apiKey = "97429586400ad70073756ff632ac746e";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/forecast?q=" + query+ "&appid=" + apiKey + "&units=" + unit;


  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){

      const weatherData = JSON.parse(data);
      const temp = weatherData.list[0].main.temp;
      const weatherDescription = weatherData.list[0].weather[0].description;
      const icon =  weatherData.list[0].weather[0].icon;
      const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<p> The sky has: " +weatherDescription + "\n </p>");
      res.write(" <h1> The temprature in " + query + " is " + temp + " degree Celcius. </h1>");
      res.write("<img src="+imgURL+"> \n");


      res.send()

    })

  })
})


app.listen(3000, function(){
  console.log("server is running on port 3000");
})
