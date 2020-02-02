import React from "react";
import './App.css';
import axios from 'axios';

function Fetch() {
  const [data, setData] = React.useState({ hits: [] });
  const [query, setQuery] = React.useState('');
  const [url, setUrl] = React.useState(
    'https://api.scryfall.com/cards/named?fuzzy=',
  );
  async function getData(){
    const result = await axios.get(url + query)
    console.log(result)
    setData(result.data);
  }
  return (
      <h1>
        <header>Search for any of over 18,000 cards in Magic the Gathering</header>
      <form onSubmit={(e) => {
          e.preventDefault()
          getData()
      }}>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button>
        Search
      </button>
      </form>
      <ul className='fetchresults'>
          { data.image_uris &&
          <li>
            <img src={data.image_uris.normal} align='left' className='align'/>
            <br></br>
            <p>
            Description:
            </p>
            <br></br>
            {data.oracle_text}
            <p>
              Artist:
            </p>
            {data.artist}
          </li>
          }
      </ul>
      </h1>
  );
}
export default Fetch