import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Menu from './pages/Menu';
import CustomizeCake from './pages/CustomizeCake';
import Layout from './layout';
import Dash from './pages/dash';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import Userprofile from './pages/Userprofile';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CustomerReview from "./pages/CustomerReview";
import AdminReviewPage from "./pages/ReviewsManagement";
import About from "./pages/about";
import Confirmpage from "./pages/Confirmpage";
import Cake from './pages/Cake';

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff69b4",
    },
    secondary: {
      main: "#9b2226",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
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
            <Route path="customer-review" element={<CustomerReview />} />
            <Route path="review-management" element={<AdminReviewPage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="profile" element={<Userprofile />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="customizeCake" element={<CustomizeCake />} />
            <Route path="dash" element={<Dash />} />
            <Route path="about" element={<About />} />
            <Route path='/confirm' element={<Confirmpage/>}/>
            <Route path="cake/:id" element={<Cake />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
