import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Card, Box } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Implement API call for login
    navigate('/analysis');
  };

  return (
    <Container maxWidth="sm" className="auth-container">
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Card className="auth-card" elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
          <Typography variant="h4" gutterBottom align="center">Login</Typography>
          <TextField 
            label="Email" 
            variant="outlined" 
            fullWidth 
            margin="normal" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField 
            label="Password" 
            type="password" 
            variant="outlined" 
            fullWidth 
            margin="normal" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={handleLogin} 
            className="auth-button" 
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          <Typography 
            variant="body2" 
            className="auth-link" 
            onClick={() => navigate('/register')} 
            align="center" 
            sx={{ mt: 2, cursor: 'pointer', color: 'primary.main' }}
          >
            Don't have an account? Register here.
          </Typography>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginPage;