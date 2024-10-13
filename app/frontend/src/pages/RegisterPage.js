import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Card, Box } from '@mui/material';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleRegister = async () => {
      // Implement API call for registration
      navigate('/');
    };
  
    return (
      <Container maxWidth="sm" className="auth-container">
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Card className="auth-card" elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
            <Typography variant="h4" gutterBottom align="center">Register</Typography>
            <TextField 
              label="Username" 
              variant="outlined" 
              fullWidth 
              margin="normal" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
            />
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
              onClick={handleRegister} 
              className="auth-button" 
              sx={{ mt: 2 }}
            >
              Register
            </Button>
            <Typography 
              variant="body2" 
              className="auth-link" 
              onClick={() => navigate('/')} 
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