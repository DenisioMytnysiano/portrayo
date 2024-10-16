import React from 'react';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider as Emotion10ThemeProvider } from '@emotion/react';
import { createRoot } from 'react-dom/client';

const RootApp = () => {
  // Dark mode is now always enabled

  const theme = useMemo(() => 
    createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#90caf9',
        },
        secondary: {
          main: '#f48fb1',
        },
        background: {
          default: '#121212',
          paper: '#1e1e1e',
        },
        text: {
          primary: '#ffffff',
          secondary: '#bbbbbb',
        },
      },
      typography: {
        fontFamily: 'Lato, Arial, sans-serif',
        h4: {
          fontWeight: 500,
          color:  '#ffffff',
        },
        body2: {
          fontSize: '1rem',
          color: '#ffffff',
        },
        button: {
          textTransform: 'uppercase',
        },
      },
      components: {
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 10,
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 10,
              textTransform: 'capitalize',
              fontWeight: 300,
            },
          },
        },
      },
    }), 
  );

  return (
    <Emotion10ThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);