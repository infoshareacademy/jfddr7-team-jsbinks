import * as React from 'react';
import { Link as RLink, useNavigate } from "react-router-dom";
import {firebaseAuth} from "../../index"
import {useState} from "react"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Container, Avatar, Button, CssBaseline, TextField, Link, Box, Grid, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme/theme';
import { Copyright } from '../Copyright';
import background from '../../images/background.jpg';

export function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState('');
  const navigate = useNavigate();
    
    const handleSignIn = (event: React.SyntheticEvent): void => {
      event.preventDefault()
      signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(cred => {
        navigate('/wallet')
      })
      .catch (e => {
        if (e.code === 'auth/wrong-password') {
          setError("Błędny mail lub hasło")
        } else if (e.code === 'auth/user-not-found') {
          setError("Nie ma takiego użytkownikia")
        } else if (e.code === 'auth/invalid-email') {
          setError("Podaj poprawnie zapisany e-mail i hasło")
        } else {
          setError('Coś poszło nie tak, spróbuj ponownie później')
        }
      })
    }

  return (
    <Box
    sx={{
      height: '100vh',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth='xs'
      sx={{
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
              Proszę zaloguj się do Budżetówki
            </Typography>
            <Box component="form" noValidate onSubmit={handleSignIn} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Twój E-mail"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Hasło"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Loguje się
              </Button>
              <Grid container justifyContent='center'>
                <Grid item>
                  <RLink to='/signup'>
                    <Button color='primary'>
                    Nie masz konta? Zarejestruj się tutaj
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