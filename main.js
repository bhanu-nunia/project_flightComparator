const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require('path');

const getFlightNumber = require("./getFlightNumber");

// (./../march 11/ques-3)   (../ -> to go back from a folder)

module.exports = async function (flightUrl) {

  // flightUrl = "https://flights.booking.com/flights/DEL-DXB/?type=ONEWAY&adults=1&cabinClass=BUSINESS&children=&from=DEL&to=DXB&fromCountry=IN&toCountry=AE&fromLocationName=Delhi+International+Airport&toLocationName=Dubai&depart=2022-04-30&sort=BEST&aid=304142&label=gen173nr-1DCAEoggI46AdIM1gEaGyIAQGYAQm4ARfIAQzYAQPoAQGIAgGoAgO4AtLchpIGwAIB0gIkNjBiOThlMjYtM2ZmZS00NDQ2LTg4ZDgtMzIyYTk0ODRjOGI22AIE4AIB"


  let browser = await puppeteer.launch({ headless: false });
  let page = await browser.newPage();

  await page.goto(flightUrl, { waitUntil: "networkidle0" });

  let flightsData = await page.evaluate(() => {
    let flights = document.querySelectorAll(".css-4o3ibe");
    // return flights.length;
    flightInfo = [];
    flights.forEach((flight, idx) => {
      let flightID = idx,
        name = null,
        price = null,
        duration = null,
        departureTime = null,
        arrivalTime = null;

      if (flight.querySelector(".css-1dimx8f")) {
        name = flight.querySelector(".css-1dimx8f").innerText;
      }
      if (flight.querySelector('[data-test-id="flight_card_price_main_price"]')) {
        price = flight.querySelector('[data-test-id="flight_card_price_main_price"]').innerText.replace("INR", "").replace(",", "");
      }
      if (flight.querySelectorAll(".Text-module__root--variant-strong_1___2UxW5")[0]) {
        departureTime = flight.querySelectorAll(
          ".Text-module__root--variant-strong_1___2UxW5"
        )[0].innerText;
      }
      if (
        flight.querySelectorAll(
          ".Text-module__root--variant-strong_1___2UxW5"
        )[1]
      ) {
        arrivalTime = flight.querySelectorAll(
          ".Text-module__root--variant-strong_1___2UxW5"
        )[1].innerText;
      }

      if (
        flight.querySelectorAll(
          ".Text-module__root--variant-small_1___16UY4.css-16zx0g8"
        )[0]
      ) {
        duration = flight.querySelectorAll(
          ".Text-module__root--variant-small_1___16UY4.css-16zx0g8"
        )[0].innerText;
      }

      let tempDuration = duration.replace("h", "").replace("m", "");

      tempDuration = tempDuration.split(" ");

      // durationInMinutes=tempDuration[0]*60 + parseInt(tempDuration[1])
      let durationInMinutes = tempDuration[0] * 60 + tempDuration[1] * 1;

      flightInfo.push({
        flightID,
        name,
        price,
        departureTime,
        arrivalTime,
        duration,
        durationInMinutes,
      });
    });
    return flightInfo;
  });

  if(!fs.existsSync('processedData')){
    fs.mkdirSync('processedData')
  }

  let filePath1 = path.join(__dirname,'processedData',"flightsData.json")
  let filePath2 = path.join(__dirname,'processedData',"sortedData.json")


  fs.writeFileSync(filePath1, JSON.stringify(flightsData))
  
  flightsData.sort(function (x, y) {
    return x.price - y.price;
  });
  let flightNumber = await getFlightNumber(flightUrl, flightsData[0].flightID);
  let cheapestFlight = { flightNumber, ...flightsData[0] };
  delete cheapestFlight.durationInMinutes;
  
  flightsData.sort(function (x, y) {
    return x.durationInMinutes - y.durationInMinutes;
  });
  flightNumber = await getFlightNumber(flightUrl, flightsData[0].flightID);
  let fastestFlight = { flightNumber, ...flightsData[0] };
  delete fastestFlight.durationInMinutes;
  
  delete flightsData.durationInMinutes
  console.table(flightsData);

  let answer = { cheapestFlight, fastestFlight }
  fs.writeFileSync(filePath2, JSON.stringify(answer))
  console.log(answer);
  

  await browser.close();
}

