import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [userName, setUserName] = useState(null);  // State for reactivity

  // Listen for storage changes (including manual login)
  useEffect(() => {
    const checkUser = () => {
      const name = localStorage.getItem('userName');
      setUserName(name || null);
    };

    // Initial check
    checkUser();

    // Listen for changes (login triggers this)
    window.addEventListener('storage', checkUser);
    // Poll every 500ms for manual login
    const interval = setInterval(checkUser, 500);

    return () => {
      window.removeEventListener('storage', checkUser);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setUserName(null);  // Clear state
    window.location.href = '/login';
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Hospital Management
          </Link>
        </Typography>
        
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/about">About</Button>
        <Button color="inherit" component={Link} to="/contact">Contact</Button>
        <Button color="inherit" component={Link} to="/appointments">Appointments</Button>
        <Button color="inherit" component={Link} to="/departments">Departments</Button>
        <Button color="inherit" component={Link} to="/doctors">Doctors</Button>

        {userName ? (
          <div className="user-menu">
            <Button color="inherit">Welcome, {userName}</Button>
            <div className="logout-dropdown">
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
