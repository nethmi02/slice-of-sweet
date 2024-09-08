import React, { useState } from "react"; // Add useState import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import Home from "./pages/home";
import Menu from "./pages/Menu";
import CustomizeCake from "./pages/CustomizeCake";
import Layout from "./layout";
import Dash from "./pages/owner/dash";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerReview from "./pages/Reviews/CustomerReview";
import AdminReviewPage from "./pages/Reviews/ReviewsManagement";
import RegisterPage from "./pages/components/RegisterPage";
import Login from "./pages/components/LoginPage";
import SignUp from "./pages/components/RegisterPage";
import Userprofile from "./pages/components/Userprofile";
import Editprofile from "./pages/components/Editprofile";
import Newprofile from "./pages/components/Newprofile";
import Checkout from "./pages/order/Checkout";
import Confirmpage from "./pages/confirmation/Confirmpage";
import Ordersummary from "./pages/order/Ordersummary";

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
  const [userData, setUserData] = useState("");
  const [profiledata, setProfiledata] = useState(""); // Fixed typo in state setter
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
            <Route
              path="profile"
              element={
                <Userprofile userData={userData} setUserData={setUserData} />
              }
            />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<Login />} />
            <Route
              path="editprofile"
              element={<Editprofile setProfiledata={setProfiledata} />}
            />
            <Route
              path="newprofile"
              element={
                <Newprofile
                  profiledata={profiledata}
                  setProfiledata={setProfiledata}
                />
              }
            />
            <Route path="signup" element={<SignUp />} />
            <Route path="orderconfirm" element={<Confirmpage />} />
            <Route path="ordersummary/:id" element={<Ordersummary />} />
            <Route path="customizeCake" element={<CustomizeCake />} />
            <Route path="dash" element={<Dash />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
