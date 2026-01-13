import "./style.css";
import { MeteoService } from "./meteo-service.js";
import { Chart } from "chart.js";

const service = new MeteoService();

service.getMeteoData().then(meteoData => displayMeteo(meteoData));

function displayMeteo(meteoData) {

    const container = document.getElementById('app');
    container.innerHTML = "";

    for (const data of meteoData) {

        console.log(data);

        const card = document.createElement('div');

        const spanTime = document.createElement('span');
        spanTime.innerHTML = data.time;
        card.appendChild(spanTime);

        const spanRain = document.createElement('span');
        spanRain.innerHTML = data.rain;
        card.appendChild(spanRain);

        const spanTemp = document.createElement('span');
        spanTemp.innerHTML = data.temperature;
        card.appendChild(spanTemp);

        const spanCode = document.createElement('span');
        spanCode.innerHTML = data.code;
        card.appendChild(spanCode);

        const spanWind = document.createElement('span');
        spanWind.innerHTML = data.wind;
        card.appendChild(spanWind);

        container.appendChild(card);
    }

}


function testChart() {

    const labels = Utils.months({ count: 7 });

    const data = {
        labels: labels,
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const config = {
        type: 'line',
        data: data,
    };

    const canvas = document.getElementById('pippo')

    new Chart(canvas, config)

}