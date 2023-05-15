import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_REVIEWS } from '../utils/queries';
import ReviewCard from '../components/ReviewCard';

export default function HomePage() {
    // const [breweryData, setBreweryData] = useState();
    const [breweryData, setBreweryData] = useState(new Set([]));
    const { loading, data, refetch } = useQuery(ALL_REVIEWS);

    // calls OpenBreweryDB API and sets breweryData State for all breweries
    useEffect(() => {
        if (!loading && data.reviews && data.reviews.length > 0) {
            const reviewArr = data.reviews;
           
            reviewArr.forEach(async (data) => {
                const searchByIdApi = `https://api.openbrewerydb.org/v1/breweries/${data.review.breweryId}`;
                fetch(searchByIdApi)
                    .then((response) => response.json())
                    .then((info) => {
                        setBreweryData((current) => {
                            // checks if the brewery already exists in the set
                            if (![...current].some((brewery) => brewery.id === info.id)) {
                                // adds the brewery to the set
                                return new Set([...current, info]);
                            }
                            return current; // returns current set without adding the duplicate brewery
                        });
                        refetch();
                    })
                    .catch((error) => console.error(error));
            });
            handleBreweryMatch()
        }
    }, [data]);

    const handleBreweryMatch = () => {
        const breweryArr = [...breweryData];
        console.log(data.reviews[0].review.breweryId)
        const match = breweryArr.map((brewery) => {
            for (let i = 0; i < data.reviews.length; i++) {
                if (brewery.id === data.reviews[i].review.breweryId) {
                    return brewery;
                }
            }
            return brewery.id;
        });
        console.log(match)
        return match;
    }

    
    return (
        <>
            {!loading && data && breweryData && (
                <>
                {data.reviews.map((oneReview) => {
                    return <ReviewCard
                        handleBreweryMatch={handleBreweryMatch}
                        oneReview={oneReview}
                        key={oneReview?._id}
                        breweryData={breweryData}
                    />
                })}
                </>
            )}
        </>
    )
}