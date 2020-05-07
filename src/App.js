import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // useHistory 
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Pricing from "./components/Pricing";
import SignUp from "./components/SignUp";
import Footer from './components/Footer';
import FormRegister from "./components/FormRegister";
import TryMap from './components/TryMap';


function App() {
  return (
    <Router>
          <Switch>
            <Route exact path="/">
              <Pricing />
            </Route>
            <Route path="/landing">
              <Pricing />
            </Route>
            <Route path="/pricing">
              <Pricing />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/form">
              <FormRegister />
            </Route>
            <Route path="/map">
              <TryMap />
            </Route>
          </Switch>

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Footer />
    </Router>
  );
}

export default App;
