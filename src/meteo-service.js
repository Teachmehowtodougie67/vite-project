export class MeteoService {
    
    static API_URL = "https://api.open-meteo.com/v1/forecast?latitude=44.411&longitude=8.896&hourly=temperature_2m,rain,weather_code,wind_speed_10m"

    constructor(){}

    getMeteoData(){
        return fetch(MeteoService.API_URL)
        .then(response => response.json())
        .then(data => this.transformData(data))
        .then(transformedData => transformedData);
    }

    transformData(data){

        //console.log("dati dal l'api",data);

        const hourlyData = data.hourly;

        //console.log("solo i dati orari",hourlyData);

        const times = hourlyData.time;

        //console.log('orari', times);

        const temperaures = hourlyData.temperature_2m;

        //console.log('temp', temperaures);

        const rains = hourlyData.rain;

        //console.log('rain', rains);

        const codes = hourlyData.weather_code;

        //console.log('codes', codes);

        const winds = hourlyData.wind_speed_10m;

        //console.log('winds', winds);

        const newArray = [];

        for (let i = 0; i < times.length; i++) {
            
            const time = times[i];
            const temperaure = temperaures[i];
            const rain = rains[i];
            const code = codes[i];
            const wind = winds[i];

            // const hourData = {
            //     time: time,
            //     temperaure: temperaure,
            //     rain: rain,
            //     code: code,
            //     wind: wind
            // }

            const hourData = {
                time,
                temperaure,
                rain,
                code,
                wind
            };

            newArray.push(hourData);
            
        }

        return newArray;


        //[{time:"2026-01-17T14:00", temperaure: 14, rain: 3, code: 0, wind: 12},
        // {time:"2026-01-17T15:00", temperaure: 17 rain: 3, code: 0, wind: 12},
        // {time:"2026-01-17T16:00", temperaure: 16, rain: 3, code: 0, wind: 12}]
    }
}