import React, { useState, useEffect } from "react";
import axios from "axios";
import PokePick from "./PokePick.js";
import "./PokeMonCss.css";

function PokeMon(props) {
  // console.log(props.match);
  // console.log(props);

  const [poke, setPoke] = useState({
    abilities: [],
    moves: [],
    sprites: [],
    stats: []
  });
  console.log("0000", props.match.params);
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${props.match.params.name}`)
      .then(response => {
        setPoke(response.data);
        console.log("response.data", response.data);
      });
  }, []);
  //   const poke = pokeDataGlobal.find(
  //     pokemon => pokemon.name === props.match.params.name
  //   );
  console.log("1111", poke);
  console.log("222", poke.abilities);
  console.log("333", poke.weight);
  console.log("555", poke.moves);
  console.log("777", poke.sprites.front_default);
  console.log("888", poke.stats);
  // console.log("999", poke.stats[0].stat.name);
  const mapAbilities = poke.abilities.map(ability => {
    console.log("444", ability);
    return <div className="ability">{ability.ability.name}</div>;
  });

  const mapMoves = poke.moves.map(move => {
    console.log("555", move);
    return <div className="move">{move.move.name}</div>;
  });

  const mapStats = poke.stats.map(stat => {
    console.log("stat", stat);
    return (
      <div className="stats">
        {/* {stat.name} */}
        {stat.stat.name}
        <br></br>
        {stat.base_stat}
      </div>
    );
  });

  return (
    <div>
      <nav className="navigation">
        <a href="/">
          <img
            class="logo"
            src="https://pluspng.com/img-png/pokemon-logo-png-pokemon-logo-png-2000.png"
          />
        </a>
      </nav>
      <div className="body-2">
        <img
          className="poke-img"
          src={poke.sprites.front_default}
          alt="Smiley face"
          height="200"
          width="200"
        />
        <h1 className="pokename-2"> {poke.name}</h1>
        <div className="height-bg">
          <h1 className="height">Height:{poke.height}</h1>
          <h1 className="weight">Weight:{poke.weight}</h1>
          <div class="border-hor"></div>
          <div class="border-vert"></div>
        </div>
        <div class="container-2">
          <h1 className="stat-poke">Stats:</h1>
          <div class="border-vert-2"></div>
          {/* <a class="text-2">Stats:</a> */}
          <div class="border-skin"></div>
        </div>
        <div className="stat-cont">{mapStats}</div>
        <div class="border-hor-2"></div>
        <h1 className="abilities">Abilities:</h1>
        <div className="abilities-text">{mapAbilities}</div>
      </div>
      <div className="moves-body">
        <h1 className="moves">Moves:</h1>

        <div className="moves-cont">{mapMoves}</div>
      </div>
    </div>
  );
}

export default PokeMon;
