import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function DexScreener() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Replace with actual API endpoint and perform API call
    const searchEndpoint = `https://api.dexscreener.com/latest/dex/search/?q=${searchInput}`;

    axios.get(searchEndpoint)
      .then(response => {
        // Handle the response data
        const sortedPairs = response.data.pairs
          .sort((a, b) => b.priceUsd - a.priceUsd)
          .slice(0, 10);

        setSearchResults(sortedPairs);
      })
      .catch(error => {
        console.error('Error fetching search data:', error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter token address"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div id="results">
	  
		<h1>Token Search Results</h1>
		
        {searchResults.map(pair => (
          <div key={pair.chainId} className="">
			
            <div className="card basic-info">
				<p className="section-heading">Basic Info</p>
				<p><div className="field-name">Pair Created At: </div><div className="field-value">{pair.pairCreatedAt}</div></p>
				<p><div className="field-name">Symbol: </div><div className="field-value">{pair.chainId}</div></p>
				<p><div className="field-name">Dex ID: </div><div className="field-value">{pair.dexId}</div></p>
				<p><div className="field-name">Pair Address: </div><div className="field-value">{pair.pairAddress}</div></p>
			  </div>
			  <div className="card base-token">
				<p className="section-heading">Basic Token</p>
				<p><div className="field-name">Name:</div><div className="field-value"> {pair.baseToken.name}</div></p>
				<p><div className="field-name">Symbol:</div><div className="field-value"> {pair.baseToken.symbol}</div></p>
				<p><div className="field-name">Address:</div><div className="field-value"> {pair.baseToken.address}</div></p>
			  </div>
			  <div className="card quote-token">
				<p className="section-heading">Quote Token</p>
				<p><div className="field-name">Name:</div><div className="field-value"> {pair.quoteToken.name}</div></p>
				<p><div className="field-name">Symbol:</div><div className="field-value"> {pair.quoteToken.symbol}</div></p>
				<p><div className="field-name">Address:</div><div className="field-value"> {pair.quoteToken.address}</div></p>
			  </div>
			  <div className="card price">
				<p className="section-heading">Price</p>
				<p><div className="field-name">Price Native:</div><div className="field-value"> {pair.priceNative}</div></p>
				<p><div className="field-name">Price USD:</div><div className="field-value"> {pair.priceUsd}</div></p>
			  </div>
			</div>
		  ))}
		</div>
    </div>
  );
}

export default DexScreener;
