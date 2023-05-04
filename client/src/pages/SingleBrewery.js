import React from 'react';
import BreweryCard from '../components/BreweryCard'
import Review from '../components/Review'
export default function SingleBrewery() {
    return (
        <>
        <BreweryCard/>
        <div>Google Maps API here</div>
        <ul>
            <div>reviews by review.length</div>
            <li><Review/></li>
            <li><Review/></li>
            <li><Review/></li>
        </ul>
        </>
    )
}