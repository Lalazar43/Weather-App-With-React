import "./App.css";
import React, { useState } from "react";

const App = () => {
  const [query, setQuery] = useState(``);
  const [weather, setWeather] = useState({});

  const Search = (evt) => {
    if (evt.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=a0a970ed1f74423e54047254e69af60e`
      )
        .then((data) => data.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
          console.log(result);
        });
    }
  };

  const dateBuilder = (a) => {
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    let months = [
      "January",
      "February",
      " March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let day = days[a.getDay()];
    let month = months[a.getMonth()];
    let year = a.getFullYear();

    return `${day}, ${month}, ${year}`;
  };

  return (
    <div className="Card">
      <div>
        <input
          type="text"
          placeholder="Search for cites"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={Search}
          className="Input"
        />
      </div>
      {typeof weather.main != "undefined" ? (
        <div className="Box">
          <div className="Location-Box">
            {weather.name}, {weather.sys.country}
          </div>
          <div className="Date-Box">{dateBuilder(new Date())}</div>
          <div className="Temp-Box">{Math.round(weather.main.temp - 274)}°C</div>
          <div className="Weather-Box">{weather.weather[0].main}</div>
          <div className="Wind-speed">{weather.wind.speed} km/h</div>
        </div>
      ) : (
        <div className="false-city">Nothing found...</div>
      )}
    </div>
  );
};

export default App;
