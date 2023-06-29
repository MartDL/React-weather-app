import { useState, useEffect } from 'react';

export const useWeatherAPI = (apiKey, city) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
          city,
        )}`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setWeatherData(data);
        } else {
          setError(data.error.message);
        }
      } catch (error) {
        setError('An error occurred while fetching weather data.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [apiKey, city]);

  return { weatherData, loading, error };
};
