import React, { useState, useEffect } from "react";
import "./PokeCardCss.css";
import PokeCard from "./PokeCard.js";
import PokePick from "./PokePick.js";
import PokeMon from "./PokeMon.js";
import { withRouter } from "react-router-dom";
import { Link, Switch, Route } from "react-router-dom";
import axios from "axios";

function PokemonFavorites(props) {
    const [pokes, setPokes] = useState([]);
  
    useEffect(() => {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?format=json")
        .then(response => {
          setPokes(response.data.results);
  
          // console.log(response.data);
        });
    }, []);
  
    console.log("pokes", pokes);
    const mapToDo = pokes.map(poke => {
      return (
        <Link className="pokename" to={`/favorites/${poke.name}`}>
          <div>
            <h1 className="pokename">{poke.name}</h1>
          </div>
          <div class="border-wid"></div>
        </Link>
      );
    });
  
    return (
      <div className="body">
        <nav className="navigation">
          <a href="/">
            <img
              class="logo"
              src="https://pluspng.com/img-png/pokemon-logo-png-pokemon-logo-png-2000.png"
            />
          </a>
        </nav>
        {mapToDo}
      </div>
    );
  }
export default PokemonFavorites
