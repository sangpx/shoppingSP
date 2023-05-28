import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//pages
import CartPage from "./pages/CartPage/CartPage.jsx";
import CategoryPage from "./pages/CategoryPage/CategoryPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";

//components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
