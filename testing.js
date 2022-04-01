// (async () => {
//     const browser = await puppeteer.launch({ headless: true })
//     const page = await browser.newPage()
//     await page.goto('https://github.com/login')
//     await page.type('#login_field', process.env.GITHUB_USER)
//     await page.type('#password', process.env.GITHUB_PWD)
//     await page.click('[name="commit"]')
//     await page.waitForNavigation()
//     await page.screenshot({ path: screenshot })
//     browser.close()
//     console.log('See screenshot: ' + screenshot)
//    })()

const puppeteer = require('puppeteer');

(async () => {

    flightUrl = 'https://flights.booking.com/flights/DEL-PNQ/?type=ONEWAY&adults=1&cabinClass=ECONOMY&children=&from=DEL&to=PNQ&fromCountry=IN&toCountry=IN&fromLocationName=Delhi+International+Airport&toLocationName=Pune+International+Airport&depart=2022-04-30&sort=BEST&aid=304142&label=gen173nr-1DCAEoggI46AdIM1gEaGyIAQGYAQm4ARfIAQzYAQPoAQGIAgGoAgO4AtLchpIGwAIB0gIkNjBiOThlMjYtM2ZmZS00NDQ2LTg4ZDgtMzIyYTk0ODRjOGI22AIE4AIB';

    let url2 = "https://flights.booking.com/flights/DEL-PNQ/d7699_H4sIAAAAAAAA_y2Pa2-CMBiFf838RqG03Eyahc1LzATBZRr90kCpXOaoabtM_fWrYN435zznPf3SRuuLmtr26dzWjVZW24NaaFEXmgMmfuyTNFIK8d32tV200p7N11maIyfOtja0LTNsenjlV20pycikLTkoFCNZHD5ZEh_AY5wsc281nJjQBAPXDzLfW-8X3niUZJkvomRMFUlm6m9zP75t7iu0ucHPr07d0q7K026X7Gbbw_CMM0YgADiI4JBFoUgQPplpAp0RK022UYLSfIyaeE4UBGhIVwKhjyMAYYDdieJnznQr-g9-I_7cx8gyX71I17UOL-574fwyWRt4QbHZmjpGm0ELGgbGSooeJRutojhC3Hn0nOKwdFxDJ4rnxloKgQMeVUdXe2N32gS-6OU_qyTUSJMBAAA./?type=ONEWAY&adults=1&cabinClass=ECONOMY&children=&from=DEL&to=PNQ&fromCountry=IN&toCountry=IN&fromLocationName=Delhi+International+Airport&toLocationName=Pune+International+Airport&depart=2022-04-30&sort=BEST&aid=304142&label=gen173nr-1DCAEoggI46AdIM1gEaGyIAQGYAQm4ARfIAQzYAQPoAQGIAgGoAgO4AtLchpIGwAIB0gIkNjBiOThlMjYtM2ZmZS00NDQ2LTg4ZDgtMzIyYTk0ODRjOGI22AIE4AIB"

    
    let browser = await puppeteer.launch();
    let page2 = await browser.newPage();


    await page2.goto(flightUrl, { waitUntil: 'networkidle0' });
    let flightsData = await page2.evaluate(() => {

        let flights = document.querySelectorAll('.css-h2u54n .Text-module__root--variant-small_1___16UY4');
        // return flights.length;
        flightInfo = [];
        checkData = [];
        flights.forEach(flight => {
            let name = null, flightNumber = null, price = null, duration = null, iTime = null, fTime = null;

            if (flight.querySelectorAll('.Button-module__text___XTWR1')) {
                page2.click('.Button-module__text___XTWR1')
                page2.waitForNavigation()
                if('.css-h2u54n .Text-module__root--variant-small_1___16UY4')
                flightNumber = flight.querySelectorAll('.css-h2u54n .Text-module__root--variant-small_1___16UY4')[1].innerText;
            }

            flightInfo.push({ flightNumber });

        })
        return flightInfo;

    });
    console.log(flightsData);
    await browser.close();

})();