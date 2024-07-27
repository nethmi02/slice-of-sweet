import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Home from "./pages/home";
import About from "./pages/about";
import Layout from "./layout";

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
