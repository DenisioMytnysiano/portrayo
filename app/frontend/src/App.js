import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AnalysisPage from './pages/AnalysisPage';
import DashboardPage from './pages/DashboardPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

const App = () => {
  const [username, setUsername] = useState('');

  const handleLogout = () => {
    setUsername('');
  };

  const handleLogin = (username) => {
    setUsername(username)
  }

  return (
    <Router>
      <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header username={username} onLogout={handleLogout} style={{ position: 'sticky', top: 0, zIndex: 1000 }} />
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin}/>}/>
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
