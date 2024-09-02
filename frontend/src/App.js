import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Menu from "./pages/Menu";
import Layout from "./layout";
import Cart from "./pages/Cart";
import Checkout from './pages/order/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import Userprofile from './pages/components/Userprofile';
import RegisterPage from './pages/components/RegisterPage';
import LoginPage from './pages/components/LoginPage';
import CustomerReview from "./pages/components/CustomerReview";
import AdminReviewPage from "./pages/components/ReviewsManagement";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff69b4", // Customize your primary color
    },
    secondary: {
      main: "#9b2226", // Customize your secondary color
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif", // Customize your font family
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
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
