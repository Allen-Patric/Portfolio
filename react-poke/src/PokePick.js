import React, { useState, useEffect } from "react";
import axios from "axios";

function PokePick(props) {
  return (
    <div>
      {/* <h1>{props.name}</h1> */}
      {/* <p>{props.height}</p> */}
      <p>{props.weight}</p>
    </div>
  );
}

export default PokePick;
