import React, { useEffect, useState } from 'react'
import './index.css';

const api = {
  key: "28da572ff4090ea5fb6354a2dbb00b2f",
  base: "http://api.openweathermap.org/data/2.5/"
}

function App() {

  const [veri, setVeri] = useState('');
  const [weather, setWeather] = useState('');

  const arama = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${veri}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setVeri('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    let days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
    let date = d.getDate();
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${date} ${month} ${day} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 15) ? 'app-warm' : 'app') : 'app'}>
      <main>
        <div className='search-box'>
          <input type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setVeri(e.target.value)}
            value={veri}
            onKeyPress={arama} />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temperature'>{Math.round(weather.main.temp)}°C</div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
            <div className='footer'>
              <div></div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
