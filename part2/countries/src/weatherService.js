import axios from 'axios';

const getWeather = (name) => {
  const weatherURL = import.meta.env.VITE_WEATHER_URL;
  const weatherApiKey = import.meta.env.VITE_WEATHER_API;
  const request = axios.get(`${weatherURL}?q=${name}&appid=${weatherApiKey}`);
  return request.then((response) => response.data);
};

export default { getWeather };
