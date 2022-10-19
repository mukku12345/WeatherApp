  const http = require("http");
  const fs = require("fs");
  var requests = require("requests")
  const homeFile =fs.readFileSync("home.html","utf-8");
   const port=5001;

  const replaceVal = (tempVal,orgVal)=>{
    let temperature =tempVal.replace("{%tempval%}",orgVal.main.temp)
    temperature =temperature.replace("{%tempmin%}",orgVal.main.temp_min)
    temperature =temperature.replace("{%tempmax%}",orgVal.main.temp_max)
    temperature =temperature.replace("{%location%}",orgVal.name)
    temperature =temperature.replace("{%country%}",orgVal.sys.country)
    temperature =temperature.replace("{%tempStatus%}",orgVal.weather[0].main)
    

    return temperature;
  }



  const  server =http.createServer((req,res)=>{
  if(req.url=="/"){
        requests(
            "http://api.openweathermap.org/data/2.5/weather?q=Lucknow&units=metric&appid=5fe394974129a6185ed442c85dfc7878"
        )
        .on("data",(chunk)=>{
            const objData = JSON.parse(chunk);
            const arrayData = [objData];
            // console.log(arrayData[0].main.temp);
            const realTimeData =arrayData.map((val)=>replaceVal(homeFile,val)).join("")
            res.write(realTimeData);
            console.log(realTimeData);   
        })
        .on("end",(err)=>{
            if(err)
            return console.log("connections closed due to errors",err)
            res.end();
           
        })
    } 
 })
 server.listen(port,"127.0.0.1");
