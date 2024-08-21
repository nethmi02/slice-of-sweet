import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Baker from './pages/Bakers_dashboard/Baker';
import Layout from './Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
        </Route>
        <Route path="/baker" element={<Baker />} />
      </Routes>
    </Router>
  );
}

export default App;