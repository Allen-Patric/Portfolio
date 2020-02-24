import React from "react";
import "./PokeCardCss.css";
import PokeCard from "./PokeCard.js";
import PokePick from "./PokePick.js";
import PokeMon from "./PokeMon.js";
import { withRouter } from "react-router-dom";
import { Link, Switch, Route } from "react-router-dom";

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
      <PokePick name={props.name} height={props.height} />
      <Switch>
        <Route exact path="/" render={() => <PokeCard />} />
        <Route
          exact
          path="/pokemon/:name"
          render={rProps => <PokeMon {...rProps} />}
        />
      </Switch>
    </div>
  );
}

export default withRouter(App);
