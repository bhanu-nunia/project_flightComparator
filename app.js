const express=require("express");

const app=express();
const flightRouter=require("./router");
app.use('/flightdata',flightRouter)
const port=process.env.PORT ||5000








app.listen(port,function(){
    console.log("server is running on port 5000");
})


