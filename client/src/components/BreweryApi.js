import React, { useState } from 'react';
import BreweryCard from './BreweryCard';
import { Input, Space } from 'antd';



export default function BreweryApi({ breweryList, setBreweryList }) {

    const [zipInput, setZipInput] = useState('');
    const searchByZipAPI = `https://api.openbrewerydb.org/v1/breweries?by_postal=${zipInput}&per_page=5`;

    const handleInput = (e) => {
        const { value } = e.target;

        return setZipInput(value);
    };

    function searchAPI(e) {
        fetch(searchByZipAPI)
            .then(response => response.json())
            .then(data => {
                data.length ? setBreweryList(data) : setBreweryList(null);
        });
        setZipInput('');
    };
    const { Search } = Input
    if (breweryList === null) {
        return (
            <div>
             <Space direction="vertical">
        <Search placeholder="Search by Zip Code" name="search" allowClear value={zipInput} onChange={handleInput} onSearch={searchAPI} style={{ width: 200 }} />
        </Space>
                <p>No results to show!</p>
            </div>
        )
    }
    
    return (
        <div>
    <Space direction="vertical">
        <Search placeholder="Search by Zip Code" name="search" allowClear value={zipInput} onChange={handleInput} onSearch={searchAPI} style={{ width: 200 }} />
        </Space>
            {breweryList.length > 0 ? 
            (
                <>
                    <p>Showing results for: {(breweryList[0].postal_code).slice(0, 5)}</p>
                    {breweryList && breweryList.map((brewery) => (
                        <BreweryCard brewery={brewery} key={brewery.id}/>
                    ))}
                </>
            ) :
            (
                <p>No results to show!</p>
            )}
        </div>
    )
};
