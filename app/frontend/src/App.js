import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AnalysisPage from './pages/AnalysisPage';
import DashboardPage from './pages/DashboardPage';
import { Typography } from '@mui/material';

const App = () => {
  const Header = () => (
    <header style={{ padding: '16px', backgroundColor: '#1e1e1e', textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h4" color="primary">Portrayo</Typography>
    </header>
  );

  const Footer = () => (
    <footer style={{ padding: '16px', backgroundColor: '#1e1e1e', textAlign: 'right', marginTop: 'auto' }}>
      <Typography variant="body2" color="textSecondary">© 2024 Portrayo. All rights reserved.</Typography>
    </footer>
  );

  return (
    <Router>
      <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}> 
        <Header style={{ position: 'sticky', top: 0, zIndex: 1000 }} />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/dashboard/:analysisId" element={<DashboardPage />} />
        </Routes>
        <Footer style={{ position: 'sticky', bottom: 0, zIndex: 1000 }} />
      </div>
    </Router>
  );
};

export default App;