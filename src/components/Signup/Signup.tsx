import * as React from 'react';
import { Link as RLink, useNavigate } from "react-router-dom"
import {firebaseAuth} from "../../index"
import {useState} from "react"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Container, Avatar, Button, CssBaseline, TextField, Link, Box, Grid, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme/theme'
import { Copyright } from '../Copyright';
import background from '../../images/background.jpg'

export const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (event: React.SyntheticEvent): void => {
    event.preventDefault();     
    const user = {email, password}

      createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(cred=>{
        navigate('/signin')
      })
      .catch(e => {
        if (e.code === 'auth/email-already-in-use') {
          setError('Mamy już takiego użytkownika w aplikacji')
        } else if (e.code === 'auth/weak-password') {
          setError('Hasło musi mieć co najmniej 6 znaków')
        } else if (e.code === 'auth/invalid-email') {
          setError('Podaj prawidłowy adres e-mail')
        } else {
          setError('Coś poszło nie tak, spróbuj ponownie później')
        }
      })
    }


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" sx={{
              backgroundColor: 'rgba(239, 239, 239, 0.9)',
              padding: 4
            }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Proszę zarejestruj się do Budżetówki
            </Typography>
            <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 1 }}>
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Adres E-mail"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={e => setEmail(e.target.value)}
                  />
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Hasło"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={e => setPassword(e.target.value)}
                  />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Rejestruję się
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <RLink to='/signin'>
                      <Button>
                        Masz już konto? Zaloguj się tutaj
                      </Button>
                  </RLink>
                </Grid>
              </Grid>
              <Grid container sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                  {error && <Typography variant='h6' color='error'>{error}</Typography>}
                </Grid>
              <Copyright color='primary' sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
}