import List from "./components/product/List";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./pages/Layout/MainLayout";
import Create from "./components/product/Create";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
            <Route path="/products" element={<List/>} />
            <Route path="/create" element={<Create />} />
            <Route path="/categories" element />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
