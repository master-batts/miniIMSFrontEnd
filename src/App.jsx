
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
import AuthRoute from "./hoc/AuthRoute.jsx";

function App() {


  return (
    <>
        <BrowserRouter>
            <NavbarComponent/>
            <div className="main-content container mt-4">
            <Routes>
                {/* Auth */}
                <Route path="/register" element={<AuthRoute element={<RegisterComponent />} restricted={true} />} />
                <Route path="/login" element={<AuthRoute element={<LoginComponent />} restricted={true} />} />
                {/* Protected Routes */}
                {/* Products */}
                <Route path="/" element={<AuthRoute element={<ListProductsComponent />} />} />
                <Route path="/products" element={<AuthRoute element={<ListProductsComponent />} />} />
                <Route path="/add-product" element={<AuthRoute element={<AddProductComponent />} />} />
                <Route path="/products/edit/:id" element={<AuthRoute element={<EditProductComponent />} />} />
                {/* Categories */}
                <Route path="/categories" element={<AuthRoute element={<CategoryListComponent />} />} />
                <Route path="/add-category" element={<AuthRoute element={<AddCategoryComponent />} />} />
                <Route path="/categories/edit/:id" element={<AuthRoute element={<EditCategoryComponent />} />} />
                </Routes>
            </div>
            <FooterComponent/>
        </BrowserRouter>
    </>
  )
}

export default App
