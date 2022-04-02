const puppeteer = require("puppeteer");

async function getFlightNumber(url, idx) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  const btns = await page.$$('[data-testid="flight_card_bound_select_flight"]');
  await btns[idx].click();
  await page.waitForNetworkIdle();
  const flnE = await page.waitForSelector(".css-h2u54n :nth-child(2)");
  const flightNumber = await flnE.evaluate((el) => el.innerText.split(" ")[0]);
  const clsBtn = await page.waitForSelector(
    '[aria-label="flightdetails-modal"]'
  );
  await clsBtn.click();
  await browser.close();

  return flightNumber;
}

module.exports = getFlightNumber;



// const url =
// "https://flights.booking.com/flights/DEL-PNQ?adults=1&aid=304142&cabinClass=ECONOMY&children=&depart=2022-04-30&from=DEL&fromCountry=IN&fromLocationName=Delhi+International+Airport&label=gen173nr-1DCAEoggI46AdIM1gEaGyIAQGYAQm4ARfIAQzYAQPoAQGIAgGoAgO4AtLchpIGwAIB0gIkNjBiOThlMjYtM2ZmZS00NDQ2LTg4ZDgtMzIyYTk0ODRjOGI22AIE4AIB&sort=BEST&to=PNQ&toCountry=IN&toLocationName=Pune+International+Airport&type=ONEWAY";

// (async () => {
//   const flightNumbers = [];
//   for (let i = 0; i < 1; i++) {
//     const num = await getFlightNumber(url, i);
//     flightNumbers.push(num);
//   }
//   console.log(flightNumbers);
// })();
