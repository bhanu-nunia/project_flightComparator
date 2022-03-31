const puppeteer = require('puppeteer');

(async () => {

    flightUrl = 'https://flights.booking.com/flights/DEL-PNQ/?type=ONEWAY&adults=1&cabinClass=ECONOMY&children=&from=DEL&to=PNQ&fromCountry=IN&toCountry=IN&fromLocationName=Delhi+International+Airport&toLocationName=Pune+International+Airport&depart=2022-04-30&sort=BEST&aid=304142&label=gen173nr-1DCAEoggI46AdIM1gEaGyIAQGYAQm4ARfIAQzYAQPoAQGIAgGoAgO4AtLchpIGwAIB0gIkNjBiOThlMjYtM2ZmZS00NDQ2LTg4ZDgtMzIyYTk0ODRjOGI22AIE4AIB';

    let url2 = "https://flights.booking.com/flights/DEL-PNQ/d7699_H4sIAAAAAAAA_y2Pa2-CMBiFf838RqG03Eyahc1LzATBZRr90kCpXOaoabtM_fWrYN435zznPf3SRuuLmtr26dzWjVZW24NaaFEXmgMmfuyTNFIK8d32tV200p7N11maIyfOtja0LTNsenjlV20pycikLTkoFCNZHD5ZEh_AY5wsc281nJjQBAPXDzLfW-8X3niUZJkvomRMFUlm6m9zP75t7iu0ucHPr07d0q7K026X7Gbbw_CMM0YgADiI4JBFoUgQPplpAp0RK022UYLSfIyaeE4UBGhIVwKhjyMAYYDdieJnznQr-g9-I_7cx8gyX71I17UOL-574fwyWRt4QbHZmjpGm0ELGgbGSooeJRutojhC3Hn0nOKwdFxDJ4rnxloKgQMeVUdXe2N32gS-6OU_qyTUSJMBAAA./?type=ONEWAY&adults=1&cabinClass=ECONOMY&children=&from=DEL&to=PNQ&fromCountry=IN&toCountry=IN&fromLocationName=Delhi+International+Airport&toLocationName=Pune+International+Airport&depart=2022-04-30&sort=BEST&aid=304142&label=gen173nr-1DCAEoggI46AdIM1gEaGyIAQGYAQm4ARfIAQzYAQPoAQGIAgGoAgO4AtLchpIGwAIB0gIkNjBiOThlMjYtM2ZmZS00NDQ2LTg4ZDgtMzIyYTk0ODRjOGI22AIE4AIB"

    let browser = await puppeteer.launch();
    let page = await browser.newPage();


    await page.goto(flightUrl, { waitUntil: 'networkidle0' });


    let flightsData = await page.evaluate(() => {

        let flights = document.querySelectorAll('.css-4o3ibe');
        // return flights.length;
        flightInfo = [];
        checkData = [];
        flights.forEach(flight => {
            let name = null, flightNumber = null, price = null, duration = null, iTime = null, fTime = null;





            // if(.querySelectorAll('.css-h2u54n .Text-module__root--variant-small_1___16UY4')[1]){
            //     flightNumber=flight.querySelectorAll('.css-h2u54n .Text-module__root--variant-small_1___16UY4')[1].innerText;
            // }                

            if (flight.querySelector('.css-1dimx8f')) {
                name = flight.querySelector('.css-1dimx8f').innerText;
            }
            if (flight.querySelector('[data-test-id="flight_card_price_main_price"]')) {
                price = flight.querySelector('[data-test-id="flight_card_price_main_price"]').innerText.replace("INR","").replace(",","");



                // page.waitForSelector('#flightcard-0 > div > div > div > div > div.css-1xs983m > div.css-1901um3 > div.css-1niqckn > div > div > div.css-1wnqz2m > div:nth-child(1)')
                // .then()
                // if(flight.waitForSelector('#flightcard-0 > div > div > div > div > div.css-1xs983m > div.css-1901um3 > div.css-1niqckn > div > div > div.css-1wnqz2m > div:nth-child(1)'))

                // if (flight.querySelector('#flightcard-0 > div > div > div > div > div.css-1xs983m > div.css-1901um3 > div.css-1niqckn > div > div > div.css-1wnqz2m > div:nth-child(1)')) {
                //     duration = flight.querySelector('#flightcard-0 > div > div > div > div > div.css-1xs983m > div.css-1901um3 > div.css-1niqckn > div > div > div.css-1wnqz2m > div:nth-child(1)').innerText;
                // } 

                if (flight.querySelectorAll('.Text-module__root--variant-small_1___16UY4.css-16zx0g8')[0]) {
                    duration = flight.querySelectorAll('.Text-module__root--variant-small_1___16UY4.css-16zx0g8')[0].innerText;
                }

                if (flight.querySelectorAll('.Text-module__root--variant-strong_1___2UxW5')[0]) {
                    iTime = flight.querySelectorAll('.Text-module__root--variant-strong_1___2UxW5')[0].innerText;
                }
                if (flight.querySelectorAll('.Text-module__root--variant-strong_1___2UxW5')[1]) {
                    fTime = flight.querySelectorAll('.Text-module__root--variant-strong_1___2UxW5')[1].innerText;
                }
                // let duration = (`${fTime-iTime}`);
                // if(duration<0){
                //     -1*duration;
                // }
                // console.log(iTime)
                // console.log(fTime)

                // let a= iTime +"";
                // let b= fTime +"";
                // let A = a.split(":");
                // let B = b.split(":");
                // let t1=A[0]     //*60 + A[1];
                // let t2=B[0]     //*60 + B[1];
                // checkData.push({iTime,fTime});
                // let diff=t2-t1;
                // if(diff<0){
                //     -1*diff;
                // }
                // duration= diff/60;

                flightInfo.push({ name, price, iTime, fTime, duration });
            }
        })
        return flightInfo;
        // return checkData;
    });
    console.log(flightsData);
    await browser.close();

})();