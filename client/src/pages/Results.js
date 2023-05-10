import React, {useState} from 'react';
import BreweryCard from '../components/BreweryCard'

export default function Results() {
    const [breweryList, setBreweryList] = useState(null);
    const [zipInput, setZipInput] = useState('');
    const searchByZipAPI = `https://api.openbrewerydb.org/v1/breweries?by_postal=${zipInput}&per_page=5`;

    const handleInput = (e) => {
        const { value } = e.target;

        return setZipInput(value);
    };

    function searchAPI(e) {
        e.preventDefault();
        fetch(searchByZipAPI)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setBreweryList(data);
        });
        setZipInput('');
    };

    return (
        <div>
            <form>
                <input
                    value={zipInput}
                    onChange={handleInput}
                    id="searchInput"
                    type="text"
                    placeholder="Search by Postal Code"
                    name="search"
                />
                <button htmlFor="search" onClick={searchAPI}>Search 🔍</button>
            </form>
            {breweryList ? <p>Showing results for: {(breweryList[0].postal_code).slice(0, 5)}</p> : ""}
            {breweryList && breweryList.map((brewery) => (
                <BreweryCard brewery={brewery} key={brewery.id}/>
            ))}
        </div>
    )
};
