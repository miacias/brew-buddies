import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_REVIEWS } from '../utils/queries';
import ReviewCard from '../components/ReviewCard';

export default function HomePage() {
    const [breweryData, setBreweryData] = useState();
    const { loading, data } = useQuery(ALL_REVIEWS);

    // calls OpenBreweryDB API and sets breweryData State for all breweries
    useEffect(() => {
        if (!loading && data.reviews && data.reviews.length > 0) {
            data.reviews.forEach(review => {     
                const searchByIdApi = `https://api.openbrewerydb.org/v1/breweries/${review.breweryId}`;
                fetch(searchByIdApi)
                .then((response) => response.json())
                .then((data) => setBreweryData(data))
                .catch((error) => console.error(error));
            });
        }
    }, [data]);

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