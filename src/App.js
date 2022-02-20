import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
 
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import Tic from './components/tictac';
import Navigation from './components/Navigation';
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Home />
          <Tic />
          <Navigation />
            <Routes>
    
             <Route path="/" element={<Home />} exact/>
             <Route path="/about" element={<About />}/>
             <Route path="/contact" element={<Contact />}/>
            <Route element={<Error />}/>
           </Routes>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;