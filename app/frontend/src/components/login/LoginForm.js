import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const LoginForm = ({ onSubmit, errorMessage }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(errorMessage);

  const handleSubmit = () => {
    if (!username || !password) {
      setError('Both fields are required.');
      return;
    }
    setError('');
    onSubmit(username, password);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center">Login</Typography>
      {(error || errorMessage) && (
        <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
          {error || errorMessage}
        </Typography>
      )}
      <TextField
        label="Username"
        variant="outlined"
        required
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        required
        fullWidth
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
        Login
      </Button>
    </div>
  );
};

export default LoginForm;
