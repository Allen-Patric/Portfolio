import React from "react";
import "./PokeCardCss.css";
import PokeCard from "./PokeCard.js";
import PokePick from "./PokePick.js";
import PokeMon from "./PokeMon.js";
import { withRouter } from "react-router-dom";
import { Link, Switch, Route } from "react-router-dom";
import Home from './Home.js';
import PokemonFavorites from './PokemonFavorites.js'

function App(props) {
  //<>
  // Header
  // Switch
  // Card container
  //Map through all the pokemon and return a pokeCard for each pokemon
  // Pokemon Detail component
  //Switch ends
  //Footer
  //</>

  return (
    <div className="main-container">

      
        
      <nav>
          <ul>
          <li>
        <Link to='/'>Home</Link>
        <br></br>
          </li>
          <li>
        <Link to='/pokemon'>Pokemon Inventory</Link>
        <br></br>
          </li>
          <li>
        <Link to='/favorites'>Pokemon Favorites</Link>
        <br></br>
          </li>
        </ul>
        </nav>
  
      <Switch>

      <Route exact path='/'>

        <Home/>

      </Route>

      <Route exact path="/pokemon" render={() => <PokeCard />} />
        <Route
          exact
          path="/pokemon/:name"
          render={rProps => <PokeMon {...rProps} />}
        />

    <Route path='/favorites'>

        <PokemonFavorites state={this.state}/>

    </Route>

      </Switch>

    </div>
  );
}

export default withRouter(App);

