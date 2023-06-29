import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/user/UserProvider';
import {
  Alert,
  Avatar,
  Typography,
  Grid,
  Box,
  Paper,
  CssBaseline,
  TextField,
  Button,
} from '@mui/material';
import backgroundImage from '../assets/login-image.jpg';

export const Login = () => {
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const [loginError, setLoginError] = useState(false);

  const handleValidateUser = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let user = {
      username: data.get('username'),
      password: data.get('password'),
    };

    if (user.username === 'ipgautomotive' && user.password === 'carmaker') {
      setUser({
        username: user.username,
        password: user.password,
      });
      setLoginError(false);
      history.push('/main');
    } else {
      setLoginError(true);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
        </Typography>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleValidateUser}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="username"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </Box>
          {loginError && (
            <>
              <Alert severity="error">
                Your log in credentials are incorrect!
              </Alert>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
