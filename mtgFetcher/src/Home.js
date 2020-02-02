import React from "react";
import './App.css';
import axios from 'axios';

function Home() {
 
  return (
      <h1>
          <p>
              Magic the Gathering nerds rejoice! This websites Fetch component utilizes Scryfall's api 
          and the "fuzzy" search algorithm to give you the card you've been looking for!
          </p>
          <br></br>
          <p>
              With the fuzzy search algorithm spelling is not an issue!

          </p>
          <br></br>
          <ul>
              Some fun examples to try:
          <li>Rakdos lord of Diets</li>
          <li>Swords to plowsharts</li>
          <li>Sakashima the implostor</li>
           </ul>
      </h1>
  );
}
export default Home
