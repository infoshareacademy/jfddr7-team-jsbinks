
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { theme } from '../../../theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import { Copyright } from '../../Copyright';

export const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
    <Box
        component="footer"
        color="primary"
        sx={{
          width: '100%',
          py: 1,
          px: 2,
          mt: 'auto',
          color: 'primary',
          backgroundColor: '#1b5e20'
        }}
      >
          <Copyright color='neutral.contrastText' />
      </Box>
      </ThemeProvider>
  )
}

