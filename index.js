const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs/promises");
const path = require('path');

const app = express();

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

flightRouter.get('/flights',getFlights)
flightRouter.post('/flights',postFlights)

async function getFlights(req,res){
    const data = await flightModel.find()
    res.json({
        message: "get is working" ,
        data : data
    })
}

async function postFlights(req,res){
    const filePath1 = path.join(__dirname,'data','sortedData.json')
    // console.log(filePath);
    let sortedData = await fs.readFile(filePath1, {encoding : "utf-8"})
    sortedData = JSON.parse(sortedData)
    console.log(sortedData);
    

    const filePath2 = path.join(__dirname,'data','flightsData.json')
    // console.log(filePath);
    let flightData = await fs.readFile(filePath2, {encoding : "utf-8"})
    flightData = JSON.parse(flightData)
    console.log(flightData);

    await flightModel.deleteMany()

    await flightModel.create(sortedData.cheapestFlight)
    await flightModel.create(sortedData.fastestFlight)
    await flightModel.insertMany(flightData)
    

    res.json({
        message: "post is working" 
    })
}

app.listen(3000);
