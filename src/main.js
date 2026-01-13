import "./style.css";
import { MeteoService } from "./meteo-service.js";

const service = new MeteoService();

service.getMeteoData().then(meteoData => displayMeteo(meteoData));

function displayMeteo(meteoData){

    const container = document.getElementById('app');
    container.innerHTML = "";

    for (const data of meteoData) {
        
    }

}