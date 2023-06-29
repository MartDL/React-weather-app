import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/user/UserProvider';
import {
  Typography,
  Alert,
  TextField,
  Button,
  Grid,
  Container,
} from '@mui/material';
import { WeatherCard } from '../components/index';

export const Homepage = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const [inputValue, setInputValue] = useState('');
  const [listItems, setListItems] = useState([]);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      setListItems([...listItems, inputValue]);
      setInputValue('');
    }
  };

  const handleRemoveItem = (index) => {
    const updateList = listItems.filter((item, i) => i !== index);
    setListItems(updateList);
  };

  const handleLogout = () => {
    setUser(null);
    history.push('/login');
  };

  return (
    <>
      <Typography
        variant="h2"
        component="div"
        sx={{
          flexGrow: 1,
          backgroundColor: '#87CEEB',
          height: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 2,
          fontWeight: 500,
          color: '#fff',
        }}
      >
        Weather App
        <Button
          variant="outlined"
          onClick={handleLogout}
          sx={{
            position: 'absolute',
            top: '25px',
            right: '50px',
            backgroundColor: '#fff',
            color: '#888',
            '&:hover': {
              backgroundColor: 'lightgray',
              border: '1px solid #888',
            },
          }}
        >
          Logout
        </Button>
      </Typography>
      <Container align="center">
        {showWelcomeMessage ? (
          <Alert
            align="center"
            severity="success"
            m={2}
            onClose={() => setShowWelcomeMessage(false)}
            sx={{ width: 'fit-content' }}
          >
            Welcome to the Weather App {user.username}!
          </Alert>
        ) : (
          <div style={{ height: '48px' }}></div>
        )}
      </Container>
      <Container
        maxWidth={false}
        sx={{ maxWidth: '100vw', justifyContent: 'center' }}
      >
        <Typography
          variant="p"
          component="div"
          sx={{ flexGrow: 1, margin: '30px 0 10px 0' }}
        >
          Please select up to 5 cities to view.
        </Typography>
        <TextField
          id="outlined-basic"
          label="Enter city"
          variant="outlined"
          size="small"
          value={inputValue}
          onChange={handleInputChange}
          disabled={listItems.length >= 5}
        />
        <Button
          variant="contained"
          disabled={listItems.length >= 5}
          sx={{
            ml: 1,
            mb: 2,
            '&:hover': {
              color: '#fff',
              cursor: 'pointer',
            },
          }}
          onClick={handleAddItem}
        >
          Add
        </Button>
        <Grid container spacing={1} justify="center" alignItems="center">
          {listItems.map((item, index) => (
            <Grid item key={item.id}>
              <WeatherCard
                key={index}
                title={item}
                removeItem={() => handleRemoveItem(index)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
