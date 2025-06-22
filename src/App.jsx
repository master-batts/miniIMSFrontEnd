
import './App.css'
import NavbarComponent from "./components/NavbarComponent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ListProductsComponent from "./components/ProductListComponent.jsx";
import CategoryListComponent from "./components/CategoryListComponent.jsx";
import axios from "axios";
import FooterComponent from "./components/FooterComponent.jsx";
import AddProductComponent from "./components/AddProductComponent.jsx";
import EditProductComponent from "./components/EditProductComponent.jsx";
import AddCategoryComponent from "./components/AddCategoryComponent.jsx";
import EditCategoryComponent from "./components/EditCategoryComponent.jsx";

function App() {

    axios.defaults.baseURL = `http://localhost:8081/api/`;
  return (
    <>
        <BrowserRouter>
            <NavbarComponent/>
            <div className="main-content container mt-4">
            <Routes>
                {/* Products */}
                <Route path="/" element={<ListProductsComponent />} />
                <Route path="/products" element={<ListProductsComponent />} />
                <Route path="/add-product" element={<AddProductComponent />} />
                <Route path="/products/edit/:id" element={<EditProductComponent />} />
                {/* Categories */}
                <Route path="/categories" element={<CategoryListComponent />} />
                <Route path="/add-category" element={<AddCategoryComponent />} />
                <Route path="/edit-category/:id" element={<EditCategoryComponent />} />
                </Routes>
            </div>
            <FooterComponent/>
        </BrowserRouter>
    </>
  )
}

export default App
