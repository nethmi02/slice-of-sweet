import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Menu from './pages/Menu';
import CustomizeCake from './pages/CustomizeCake';
import Layout from './layout';
import Dash from './pages/owner/dash';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="customizeCake" element={<CustomizeCake />} />
          <Route path="dash" element={<Dash />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;