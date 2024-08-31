import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Menu from './pages/Menu';
import Layout from './layout';
import Cart from './pages/Cart';
import Checkout from './pages/order/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import { createTheme } from '@mui/material/styles';
import {ThemeProvider} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff69b4', // Customize your primary color
    },
    secondary: {
      main: '#9b2226', // Customize your secondary color
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Customize your font family
  },
});

function App() {
  return (
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </Router>
  </ThemeProvider>

  );
}

export default App;
