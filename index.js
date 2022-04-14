const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs/promises");
const path = require('path');
const mainCode = require('./main')

const app = express();
app.use(express.json())
app.use(express.static('frontend'))










const dbLink =
  "mongodb+srv://bhanu_nunia:7YEfNqg7eTL1g7HI@cluster0.r2adg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

main()
  .then(() => console.log("db is connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbLink);
}

const flightSchema = new mongoose.Schema({
  flightNumber: String,
  flightID: String,
  name: String,
  price: String,
  departureTime: String,
  arrivalTime: String,
  duration: String,
});

const flightModel = mongoose.model('flightModel',flightSchema)












const flightRouter = express.Router();
app.use('/',flightRouter)

flightRouter.get('/',(req,res)=>{
  res.sendFile('index.html')
})

flightRouter.post('/scrap',async(req,res)=>{
      
      await mainCode(req.body.url)

      res.json({
        message: "done with scrapping"
      })     
})

flightRouter.get('/flights',getFlightsFromDB)
flightRouter.post('/flights',postFlightsInDB)

async function getFlightsFromDB(req,res){
    const data = await flightModel.find()
    res.json({
        message: "got data from DB successfully" ,
        data : data
    })
}

async function postFlightsInDB(req,res){
    const filePath1 = path.join(__dirname,'processedData','sortedData.json')
    // console.log(filePath);
    let sortedData = await fs.readFile(filePath1, {encoding : "utf-8"})
    sortedData = JSON.parse(sortedData)
    // console.log(sortedData);
    

    const filePath2 = path.join(__dirname,'processedData','flightsData.json')
    // console.log(filePath);
    let flightData = await fs.readFile(filePath2, {encoding : "utf-8"})
    flightData = JSON.parse(flightData)
    // console.log(flightData);

    await flightModel.deleteMany()

    await flightModel.create(sortedData.cheapestFlight)
    await flightModel.create(sortedData.fastestFlight)
    await flightModel.insertMany(flightData)
    

    res.json({
        message: "data uploaded in DB" 
    })
}

app.listen(4000,()=>{
  console.log('server is alive at port 4000');
});
