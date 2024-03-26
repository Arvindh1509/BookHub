import { CssBaseline } from "@mui/material";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./scenes/Layout";
import Dashboard from "./scenes/dashboard/index"
import Login from "./components/Login";
import Products from "./scenes/Products";
import Orders from "./scenes/orders";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path='/books' element={<Products />} />
              <Route path="/orders" element={<Orders/>}/>
            </Route>
            <Route path='/login' element={<Login />} />
            
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;