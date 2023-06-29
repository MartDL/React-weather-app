import React from 'react';
import { CardContent, Typography, Card, Button } from '@mui/material';
import { useWeatherAPI } from '../hooks/useWeatherAPI';
import CloseIcon from '@mui/icons-material/Close';

const apiKey = process.env.REACT_APP_API_KEY;

export const WeatherCard = ({ title, removeItem }) => {
  const { weatherData, loading, error } = useWeatherAPI(apiKey, title);

  return (
    <>
      {loading && <div>loading...</div>}
      {weatherData && (
        <Card sx={{ width: 210, height: 290, margin: 1, padding: 2 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <img
              src={weatherData.current.condition.icon}
              alt="Image"
              style={{ width: '50%' }}
            />

            <Button
              onClick={removeItem}
              sx={{ borderRadius: '50px', width: '20px', color: '#888' }}
            >
              <CloseIcon />
            </Button>
          </div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {weatherData.current.condition.text}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Current Temperature: {weatherData.current.temp_c} C
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Current humidity: {weatherData.current.humidity} C
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Current precipitation: {weatherData.current.precip_mm} C
            </Typography>
          </CardContent>
        </Card>
      )}
      {!weatherData && <div>No data,...</div>}
    </>
  );
};
