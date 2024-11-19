import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Box, Typography } from '@mui/material';
import { AuthService } from '../services/auth.service';
import RegisterForm from '../components/register/RegisterForm';

const RegisterPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (userData) => {
    try {
      setError('');
      await AuthService.register(userData);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" className="auth-container">
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Card className="auth-card" elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
          <RegisterForm onSubmit={handleRegister} errorMessage={error} />
          <Typography
            variant="body2"
            className="auth-link"
            onClick={() => navigate('/login')}
            align="center"
            sx={{ mt: 2, cursor: 'pointer', color: 'primary.main' }}
          >
            Already have an account? Login here.
          </Typography>
        </Card>
      </Box>
    </Container>
  );
};

export default RegisterPage;
