/* Global Variables */
//Create API credentials on OpenWeatherMap.com
//api key from weatherp.com:
const url_base = 'https://api.openweathermap.org/data/2.5/weather?zip=';
//metric to conver temp to celsius
const api_key = '&appid=c4c1abb59a466e1985293f1516a44868&units=metric';
// Create a new date instance dynamically with JS
let day = new Date();
let newDate = (day.getMonth() + 1) + '/' + day.getDate() + '/' + day.getFullYear();
//event listner
//Inside that callback function call your async GET request with the parameters:
document.getElementById("generate").addEventListener("click", doAction);

function doAction(e) {
    const zip_input = document.getElementById("zip").value;
    const feelings_input = document.getElementById("feelings").value;

    weather_temp(url_base, zip_input, api_key)
        .then(function(data) {
            //post data
            add_api_data('/add', {
                temp: data.main.temp,
                date: newDate,
                content: feelings_input
            });
            update_Ui();

        });
}
//GET api data 
const weather_temp = async(url_base, zip_input, api_key) => {
    const res = await fetch(url_base + zip_input + api_key);
    try {
        const data = await res.json();
        return data;
    } catch (r) {
        console.log("error", r);

    }
}

//After your successful retrieval of the weather data, 
//you will need to chain another Promise that makes a POST request to add the API data,
// as well as data entered by the user, to your app
//POST data:
const add_api_data = async(url = '', data = {}) => {
    const req = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            content: data.content
        })
    });
    try {
        const new_data = await req.json();
        return new_data;
    } catch (r) {
        console.log("error", r);

    }
}


//update ui :
const update_Ui = async() => {
    const request = await fetch('/all');
    try {
        const alldata = await request.json();
        document.getElementById('date').innerHTML = alldata.date;
        document.getElementById('temp').innerHTML = alldata.temp;
        document.getElementById('content').innerHTML = alldata.content;
        //r-->error
    } catch (r) {
        console.log("error", r);

    }
}