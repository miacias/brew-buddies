import React, {useState} from 'react';
import BreweryCard from '../components/BreweryCard'

export default function Results() {
    const [breweryList, setBreweryList] = useState(null);
    const searchTerm = '44107'; // Need to grab user search input
    const searchByZipAPI = `https://api.openbrewerydb.org/v1/breweries?by_postal=${searchTerm}&per_page=5`;

    function searchAPI(event) {
        event.preventDefault();
        fetch(searchByZipAPI)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setBreweryList(data);
        })
    };

    return (
        <div>
            <form>
                <input id="searchInput" type="text" placeholder="Search by Postal Code" name="search"/>
                <button htmlFor="search" onClick={searchAPI}>Search 🔍</button>
            </form>
            {breweryList && breweryList.map((brewery) => (
                <BreweryCard brewery={brewery} key={brewery.id}/>
            ))}
        </div>
    )
};
