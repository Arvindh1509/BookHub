 
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

const promise=loadStripe('pk_test_51Os1YBSGWWLum80t1jDc4VyVDFG3mT5kPSfzZeWaOktoIisebvL1BORdBFlifXjzauFxtOqMLBk2x98iiaYzm282003Plbj1uo')


function App() {
  
  


  return (
    <Router>
    <div className="App">
      {/* <h1>Hello World!</h1> */}
      <Switch>
      <Route path='/checkout'>
      <Header />
        <Checkout />
      </Route>
      <Route path='/Payment_direct'>
      <Header/>
          <Elements stripe={promise}>
          <Payment/>
          </Elements>
      </Route>
      <Route path='/OrdersHistory'>
        <Header/>
        <OrdersHistory/>
      </Route>
      <Route path='/register' >
        <Register />       
      </Route>
      <Route path='/login' component={Login}>
      
        </Route>
        <Route path='/Book_seperate'>
          <Header />
          <Book_seperate/>
        </Route>
        <Route path='/payment'>
          <Header/>
          <Elements stripe={promise}>
          <Payment
            promise={promise}
          />
          </Elements>
        </Route>
        <Route path='/'>
          <Header/>
          <Home/>
        </Route>
        <Route path='/ad'>
          <AdBanners/>
        </Route>
        
      {/* <Signin/> */}
      </Switch>
    </div>
    </Router>
  );
}

export default App;
