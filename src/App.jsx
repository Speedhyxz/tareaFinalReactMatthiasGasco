import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route} from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import Item from "./components/Item/Item";
import ItemList from "./components/ItemList/ItemList";
import Forbidden from "./pages/Forbbiden/forbbiden";
import ItemDetail from "./components/ItemDetail/ItemDetail";
import "./app.css";
import CartPage from "./components/Cart/CartPage"



function App() {
  const [bwMode, setBwMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("bwMode");
    if (saved === "true") setBwMode(true);
  }, []);

  useEffect(() => {
    if (bwMode) {
      document.body.classList.add("bw-mode");
    } else {
      document.body.classList.remove("bw-mode");
    }
  }, [bwMode]);

  const toggleMode = () => {
    setBwMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("bwMode", newMode);
      return newMode;
    });
  };

  return (
    <BrowserRouter>
      <Navbar bwMode={bwMode} toggleMode={toggleMode} />
    <Routes>
  <Route path="/" element={<ItemListContainer />} />
  <Route path="/categoria/:categoriaId" element={<ItemListContainer />} />
  <Route path="/carrito" element={<CartPage />} />
     <Route path="*" element={<Forbidden />} />
     <Route path="/item/:id" element={<ItemDetail />} />
     
</Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
