import React from 'react';
import { Typography, Button } from '@mui/material';
import { AuthService } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

const Header = ({ username, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      onLogout();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header
      style={{
        padding: '16px',
        backgroundColor: '#1e1e1e',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" color="primary">Portrayo</Typography>
      {username ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Typography variant="body1" color="white">
            Welcome, {username}!
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
