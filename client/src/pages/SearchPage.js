import React from 'react';
import Map from '../components/Map';
import BreweryApi from '../components/BreweryApi';

export default function MapPage() {
    // const [breweryList, setBreweryList] = useState(null);

    return (
        <section>
            <BreweryApi/>
            <Map/>
        </section>
    )
}

// lift state
// pass breweryList and setBreweryList as props to BreweryAPI
// pass breweryList as props to Map