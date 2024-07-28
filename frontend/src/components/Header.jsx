import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';

const Navbar = styled(AppBar)({
  backgroundColor: '#fff', 
  color: '#000', 
  boxShadow: 'none',
  padding: '10px 0',
  position: 'fixed', // Fixed position to keep it at the top
  top: 0,
  width: '100%',
  zIndex: 1000, // Ensure it stays above other content
});

const LogoContainer = styled(Box)({
  textAlign: 'center',
  marginBottom: '10px',
});

const Logo = styled('img')({
  height: 80, 
});

const NavLinks = styled('div')({
  display: 'flex',
  justifyContent: 'center', 
  alignItems: 'center',
  gap: '20px',
  width: '100%',
});

const LinkButton = styled(Button)({
  color: '#000', 
  textTransform: 'none',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: '#de4d86', 
    cursor: 'pointer',
  },
  padding: '10px 20px',
  margin: '0 10px',
});

const IconButton = styled('a')({
  margin: '0 10px',
  '& img': {
    height: 24,
    width: 24,
  },
  '&:hover': {
    backgroundColor: '#de4d86' ,
    cursor: 'pointer',
  },
});

const Header = () => {
  return (
    <Navbar>
      <Toolbar style={{ justifyContent: 'center' }}>
        <LogoContainer>
          <Logo src="/logo.png" alt="Logo" />
        </LogoContainer>
        <NavLinks>
          <LinkButton component={Link} to="/">Home</LinkButton>
          <LinkButton component={Link} to="/about">About</LinkButton>
          <LinkButton component={Link} to="/menu">Menu</LinkButton>
          <LinkButton component={Link} to="/order"> Customize Cake</LinkButton>
          <LinkButton component={Link} to="/contact">Contact Us</LinkButton>
          <IconButton href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/instagram-icon.png" alt="Instagram" />
          </IconButton>
          <IconButton href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/facebook-icon.png" alt="Facebook" />
          </IconButton>
        </NavLinks>
      </Toolbar>
    </Navbar>
  );
};

export default Header;
