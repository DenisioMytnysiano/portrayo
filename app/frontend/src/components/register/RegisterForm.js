import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const RegisterForm = ({ onSubmit, errorMessage }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = () => {
    if (!username || !email || !password) {
      setLocalError('All fields are required.');
      return;
    }
    setLocalError('');
    onSubmit({ username, email, password });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center">Register</Typography>
      {(localError || errorMessage) && (
        <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
          {localError || errorMessage}
        </Typography>
      )}
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        required
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        required
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        required
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Register
      </Button>
    </div>
  );
};

export default RegisterForm;
