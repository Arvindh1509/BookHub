 
import './App.css';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Checkout from './Checkout';
import Book_seperate from './Book_seperate';
import OrdersHistory from './OrdersHistory';
import AdBanners from './AdBanners';
import Payment from './Payment';
import {loadStripe} from "@stripe/stripe-js"
import {Elements } from "@stripe/react-stripe-js"
import Payment_direct from './Payment_direct';
import { useState } from 'react';
import AnimatedPage from './AnimatedPage';
// import LoginSeller from '../../BookHub-Seller-main/seller/src/scenes/Login';

 const promise=loadStripe('pk_test_51Os1YBSGWWLum80t1jDc4VyVDFG3mT5kPSfzZeWaOktoIisebvL1BORdBFlifXjzauFxtOqMLBk2x98iiaYzm282003Plbj1uo')
// const promise=loadStripe('pk_test_51P3djB03iUD21U4garcN9aX1xotpSJSGzJyz0shtS5dcY0ixGBADILeShBboxjzyHlvjJ21ROHHVphrjrMFhQwie00valKBlik')


function App() {

  const [search1,setSearch]=useState("");
  const searchChange=(searchInput)=>{
    // e.prevantDefault();
    console.log(searchInput);
    setSearch(searchInput); 
    console.log(search1);
  }

  return (
    <AnimatedPage>

    <Router>
      <div className="App">
        {/* <h1>Hello World!</h1> */}
        <Switch>
        
        {/* <Route path='/seller'>
          <LoginSeller/>
        </Route> */}


        <Route path='/samplePayment'>
            <Payment_direct/>
          </Route>

        {/* Check out page */}
          <Route path='/checkout'> 
            <Header />
            {/* also contains the checkout separate book components 
            and also the subtotal component*/}
            <Checkout /> 
          </Route>

          {/* has orderHistory component and checkout_book component
          and called orderHistory api*/}
          <Route path='/OrdersHistory'>
            <Header/>
            <OrdersHistory/>
          </Route>

          {/* contains register component and calls register api */}
          <Route path='/register' >
            <Register />       
          </Route>
          {/* <Route path='/sample'>
            <Payment_direct/>
          </Route> */}
          {/* used for login.js and if wantto register
           navigates to register.js */}
          <Route path='/login' component={Login}/>

          {/* called when image is clicked in book component */}
          <Route path='/Book_seperate'>
            <Header />
            <Book_seperate/>
          </Route>

          {/* From Subtotal getting navigated & does payment by calling
          payments/create, order_placing, order_item_placing*/}
          <Route path='/payment'>
            <Header/>
            <Elements stripe={promise}>
            <Payment promise={promise}/>
            </Elements>
          </Route>

          {/* main page */}
          <Route path='/'>
            <Header searchChange={searchChange} />
            <Home search1={search1} />
          </Route>

          {/* to be done */}
          <Route path='/ad'>
            <AdBanners/>
          </Route>

          <Route path='/samplePayment'>
            <Payment_direct/>
          </Route>

       </Switch>
      </div>
    </Router>
    </AnimatedPage>
  );
}

export default App;
