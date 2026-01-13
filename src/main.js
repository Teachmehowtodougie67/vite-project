import "./style.css";
import { MeteoService } from "./meteo-service.js";
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement} from "chart.js";

const service = new MeteoService();

service.getMeteoData().then(meteoData => displayMeteo(meteoData));

function displayMeteo(meteoData) {

    const temperaturepoints = getTemperaturePoints(meteoData);
    const rainpoints = getRainPoints(meteoData);
    const windpoints = getWindPoints(meteoData);

    testChart("temperature-chart", temperaturepoints);
    testChart("rain-chart", rainpoints);
    testChart("wind-chart", windpoints);

    const container = document.getElementById('app');
    container.innerHTML = "";

    for (const data of meteoData) {

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

function getTemperaturePoints(meteoData) {
    return [];
}

function getRainPoints(meteoData) {
    return [];
}

function getWindPoints(meteoData) {
    return [];
}

function testChart(canvasId, dataPoints) {

    console.log("data points", dataPoints);

    //[{x:"2026-01-13T00:00", y:9},
    //{x:"2026-01-13T01:00", y:8},
    //{x:"2026-01-13T02:00", y:7},...]

    Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement);

    const labels = ["marzo", "aprile", "maggio", "giugno", "luglio", "agosto","settembre"]

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

    const canvas = document.getElementById(canvasId)

    new Chart(canvas, config)

}

