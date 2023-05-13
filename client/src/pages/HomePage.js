import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { ALL_REVIEWS } from '../utils/queries';
import ReviewCard from '../components/ReviewCard';

export default function HomePage() {
    const [breweryData, setBreweryData] = useState();
    const { loading, data } = useQuery(ALL_REVIEWS);
    console.log(data)

    // calls OpenBreweryDB API and sets breweryData State for all breweries
    useEffect(() => {
        const searchByIdApi = `https://api.openbrewerydb.org/v1/breweries/`;
        fetch(searchByIdApi)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
            setBreweryData(data)
        })
        .catch((error) => console.error(error));
    }, []);

    if(!loading && data && breweryData) {
        return (
            <>
                {data.reviews.map((oneReview) => {
                    return <ReviewCard
                        oneReview={oneReview}
                        key={oneReview?._id}
                        breweryData={breweryData}
                    />
                })}
            </>
        )
    }
}