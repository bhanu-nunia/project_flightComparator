
let submitBtn = document.querySelector('.btn')

async function submitBtnClick(){
    // e.preventDefault()

    let url = document.getElementById('url').value;
    // console.log(getUrl);
    let response1 = await axios.post("/scrap",{url});
    console.log(response1);

    let response2 = await axios.post("/flights");
    console.log(response2);


}

let fetchBtn = document.querySelector('.btnFetch')

async function fetchData(){
    let response3 = await axios.get("/flights");
    console.log(response3);
    let cheapest = document.querySelector('#cheapest')
    let dataArray = response3.data.data
    delete dataArray[0].__v
    delete dataArray[0]._id
    delete dataArray[1].__v
    delete dataArray[1]._id
    cheapest.innerHTML = JSON.stringify(dataArray[0],undefined,2)
    
    let fastest = document.querySelector('#fastest')
    fastest.innerHTML = JSON.stringify(dataArray[1],undefined,2)
    
}

submitBtn.addEventListener('click',submitBtnClick);
fetchBtn.addEventListener('click',fetchData);


