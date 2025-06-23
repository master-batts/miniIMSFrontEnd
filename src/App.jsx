
import './App.css'
import NavbarComponent from "./components/NavbarComponent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ListProductsComponent from "./pages/product/ProductListComponent.jsx";
import CategoryListComponent from "./pages/category/CategoryListComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import AddProductComponent from "./pages/product/AddProductComponent.jsx";
import EditProductComponent from "./pages/product/EditProductComponent.jsx";
import AddCategoryComponent from "./pages/category/AddCategoryComponent.jsx";
import EditCategoryComponent from "./pages/category/EditCategoryComponent.jsx";
import RegisterComponent from "./pages/auth/RegisterComponent.jsx";
import LoginComponent from "./pages/auth/LoginComponent.jsx";

function App() {


  return (
    <>
        <BrowserRouter>
            <NavbarComponent/>
            <div className="main-content container mt-4">
            <Routes>
                {/* Auth */}
                <Route path="/register" element={<RegisterComponent />} />
                <Route path="/login" element={<LoginComponent />} />
                {/* Products */}
                <Route path="/" element={<ListProductsComponent />} />
                <Route path="/products" element={<ListProductsComponent />} />
                <Route path="/add-product" element={<AddProductComponent />} />
                <Route path="/products/edit/:id" element={<EditProductComponent />} />
                {/* Categories */}
                <Route path="/categories" element={<CategoryListComponent />} />
                <Route path="/add-category" element={<AddCategoryComponent />} />
                <Route path="/categories/edit/:id" element={<EditCategoryComponent />} />
                </Routes>
            </div>
            <FooterComponent/>
        </BrowserRouter>
    </>
  )
}

export default App
