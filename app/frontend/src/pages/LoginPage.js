import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Box, Typography } from '@mui/material';
import { AuthService } from '../services/auth.service';
import LoginForm from '../components/login/LoginForm';

const LoginPage = ({onLogin}) => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      setError('');
      await AuthService.login(username, password);
      onLogin(username)
      navigate("/analysis")
    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" className="auth-container">
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Card className="auth-card" elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
          <LoginForm onSubmit={handleLogin} errorMessage={error} />
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
