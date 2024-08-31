import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import cart from '../cart';

const Navbar = styled(AppBar)({
  backgroundColor: '#fff', 
  color: '#000', 
  boxShadow: 'none',
  padding: '10px 0',
  position: 'fixed', 
  top: 0,
  width: '100%',
  zIndex: 1000, 
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

const SocialIconButton = styled('a')({
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
          <LinkButton component={Link} to="/CustomizeCake"> Customize Cake</LinkButton>
          <LinkButton component={Link} to="/contact">Contact Us</LinkButton>
          <SocialIconButton href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/instagram-icon.png" alt="Instagram" />
          </SocialIconButton>
          <SocialIconButton href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/facebook-icon.png" alt="Facebook" />
          </SocialIconButton>
          <IconButton component={Link} to="/cart" color="inherit">
            <Badge badgeContent={cart.getItems().length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </NavLinks>
      </Toolbar>
    </Navbar>
  );
};

export default Header;
