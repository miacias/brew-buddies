import React, { useState } from 'react';
import Map from '../components/Map';
import BreweryApi from '../components/BreweryApi';
import { Input, Space } from 'antd';

export default function MapPage() {
    // State is lifted to this parent component and sent down to children
    const [breweryList, setBreweryList] = useState(null);

    return (
        <section>
            <BreweryApi breweryList={breweryList} setBreweryList={setBreweryList}/>
            <Map breweryList={breweryList}/>
        </section>
    )
}