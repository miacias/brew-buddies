import React from 'react';
import Map from '../components/Map';
import BreweryApi from '../components/BreweryApi';

export default function MapPage() {
    return (
        <section>
            <BreweryApi/>
            <Map/>
        </section>
    )
}