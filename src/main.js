    import "./style.css";
    import { MeteoService } from "./meteo-service.js";
    import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement, TimeScale} from "chart.js";
    import 'chartjs-adapter-moment';

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

            const imgcode = document.createElement('img');
            imgcode.src = "/icons/" + data.code + ".png";
            card.appendChild(imgcode);

            const spanCode = document.createElement('span');
            spanCode.innerHTML = data.code;
            card.appendChild(spanCode);

            const spanWind = document.createElement('span');
            spanWind.innerHTML = data.wind;
            card.appendChild(spanWind);

            container.appendChild(card);
        }

             const days = groupByDays(meteoData);

     const sortedDays = Object.keys(days).sort();

     const daysContainer = document.createElement('div');
     daysContainer.className = "days-container";

     sortedDays.forEach(day => {
        const dayData = days[day];
        const card = createDayRow(day, dayData,meteoData)
        daysContainer.appendChild(card);
    });
       
    container.appendChild(daysContainer);

    }

    function getTemperaturePoints(meteoData) {
        console.log("meteo data for temp", meteoData);

        const points = [];

        for (const data of meteoData) {
            const point = {
                x: data.time,
                y: data.temperature
            };
            points.push(point);
        }


        return points;
    }

    function getRainPoints(meteoData) {
        return meteoData.map(data => {
            return {x: data.time, y:data.rain}
        });
    }

    function getWindPoints(meteoData) {
        return meteoData.map(data => ({x: data.time, y:data.wind}));
    }

    function testChart(canvasId, dataPoints) {

        console.log("data points", dataPoints);

        //[{x:"2026-01-13T00:00", y:9},
        //{x:"2026-01-13T01:00", y:8},
        //{x:"2026-01-13T02:00", y:7},...]

        Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, TimeScale);

        const labels = []

        const data = {
            labels: labels,
            datasets: [{
                label: 'My First Dataset',
                data: dataPoints,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                scales: {
                    x: {
                        type: 'time',
                    }
                }
            }
        };

        const canvas = document.getElementById(canvasId)

        new Chart(canvas, config); 
    
    
    
    }

function groupByDays(meteoData) {
    const groups = {};
    meteoData.forEach(item => {
        const day = item.time.split('T')[0]; //years-month-day
        if(!groups[day]) groups[day] = [];
        groups[day].push(item);
    });
    return groups;
         
}

function createDayRow(day , hours,allData) {
    const row =document.createElement ('div');
    row.className = 'day-row';

    // data (15 gennaio )

    const dateSpan = document.formatDateItalian(day);
    row.appendChild(dateSpan);

    // first icon of the day ( ex of the hour 00:00)

    const mainIcon = document.createElement('img');
    mainIcon.className = 'main-icon';
    const mainCode = getMainCodeForDay(hours);
    mainIcon.src = `/icons/${mainCode}.png`;
    mainIcon.alt = "Weather icon";
    row.appendChild(mainIcon);

    // 4 small icons 

    const sampleHours = ['00:00', '06:00', '12:00', '18:00'];
    const iconsContainer = document.createElement('div');
    iconsContainer.className = 'small-icons';

    sampleHours.forEach(hours => {
        const closest = findClosestHour(hours, day, hour);
        if(closest) {
            const smallIcon = document.createElement('img');
            smallIcon.src = `/icons/${closest.code}.png`;
            smallIcon.className = 'small-icon';
            smallIcon.alt = `Ore ${hour}`;
            iconsContainer.appendChild(smallIcon);
        } else {
            const placeholder = document.createElement('span');
            placeholder.textContent = '--';
            iconsContainer.appendChild(placeholder);
        }
    });

    row.appendChild(iconsContainer);
    return row;
}

  function isToday(yyyyMMdd) {
    const today = new Date().toISOString().split('T')[0];
    return yyyyMMdd === today;
}

function formatDateItalian(yyyyMMdd) {
    const [y, m, d] = yyyyMMdd.split('-').map(Number);
    const date = new Date(y, m-1, d);
    return date.toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'long'
    }); // "15 gennaio"
}