import { CssBaseline } from "@mui/material";

import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";

import Layout from "./scenes/Layout";
import Dashboard from "./scenes/dashboard/index"

import Products from "./scenes/Products";
import Orders from "./scenes/orders";
import Transactions from "./scenes/Transactions";
import Add_a_book from "./scenes/Add_a_Book";
import LoginSeller from "./scenes/Login";
import RegisterSeller from "./scenes/Register";
import Your_Profile from "./scenes/Your_Profile";
import AnimatedPage from "./components/AnimatedPage";
function App() {

  // const navigate=useNavigate();
  return (
    <AnimatedPage>

    <div className="app">
      <BrowserRouter>
          <CssBaseline />
          <Routes>
          <Route path='/' element={<Navigate to='/loginSeller' replace/>}/>
          <Route path='/loginSeller' element={<LoginSeller/>} />
          <Route path='/registerSeller' element={<RegisterSeller/>}/>
            <Route element={<Layout />}>
              {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
              
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/addabook" element={<Add_a_book/>}/>
              <Route path='/books' element={<Products />} />
              <Route path="/orders" element={<Orders/>}/>
              <Route path="/transactions" element={<Transactions/>}/>  
              <Route path='/your profile' element={<Your_Profile/>}/> 
            </Route>
          </Routes>
      </BrowserRouter>
    </div>
    </AnimatedPage>
  );
}

export default App;