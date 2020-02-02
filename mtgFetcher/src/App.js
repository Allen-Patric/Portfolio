import React, { Component} from 'react';
import {Switch, Route, Link} from "react-router-dom"
import './App.css';
import Home from './Home';
import Fetch from './Fetch';
import Me from'./Me';
import axios from 'axios';


function App() {
  return (
    <div className="App">

  
        <nav>
        <Link to='/'>Home</Link>
        <br></br>
        <Link to='/Fetch'>Fetch</Link>
        <br></br>
        <Link to='/Me'>About Me</Link>
        <br></br>
        </nav>
  
      <Switch>
        <Route exact path='/'>

          <Home/>

        </Route>

        <Route path='/Fetch'>

         <Fetch/>

        </Route>

        <Route path='/Me'>

          <Me/>

        </Route>

      </Switch>

    </div>
  );
}

export default App;
