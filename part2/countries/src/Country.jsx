import { useEffect, useState } from 'react';
import weatherService from './weatherService';

const Country = ({ country }) => {
  const baseURL = 'https://openweathermap.org/img/wn/';
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    weatherService
      .getWeather(country.capital)
      .then((initWeather) => {
        setWeather(initWeather);
        console.log(weather);
      })
      .catch((error) => {
        console.log('ERROR IN GETTING WEATHER: ', error.message);
      });
  }, [country.capital]);
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <h4>Languages</h4>
      {Object.keys(country.languages).map((code) => (
        <li key={code}>{country.languages[code]}</li>
      ))}
      <img src={country.flags.png} alt="Country's flag" />
      {weather && (
        <>
          <h3>Weather in {country.capital}</h3>
          <p>Tempurature: {weather.main.temp - 273.15} Celcius</p>
          <img
            src={`${baseURL}/${weather.weather[0].icon}@2x.png`}
            alt="weather condition"
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </>
      )}
    </>
  );
};

export default Country;
