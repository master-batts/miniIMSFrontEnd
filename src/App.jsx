
import './App.css'
import NavbarComponent from "./components/NavbarComponent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ListProductsComponent from "./components/ProductListComponent.jsx";
import CategoryListComponent from "./components/CategoryListComponent.jsx";
import axios from "axios";
import FooterComponent from "./components/FooterComponent.jsx";
import AddProductComponent from "./components/AddProductComponent.jsx";

function App() {

    axios.defaults.baseURL = `http://localhost:8081/api/`;
  return (
    <>
        <BrowserRouter>
            <NavbarComponent/>
            <div className="main-content container mt-4">
            <Routes>
                <Route path="/" element={<ListProductsComponent />} />
                <Route path="/products" element={<ListProductsComponent />} />
                <Route path="/categories" element={<CategoryListComponent />} />
                <Route path="/add-product" element={<AddProductComponent />} />
                </Routes>
            </div>
            <FooterComponent/>
        </BrowserRouter>
    </>
  )
}

export default App
