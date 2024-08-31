import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Layout from "./Layout";
import Cart from "./pages/Cart";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
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
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
