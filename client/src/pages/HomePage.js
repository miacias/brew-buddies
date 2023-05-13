import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import ReviewCard from '../components/ReviewCard'

export default function Header() {
    // verifies if user is logged in and sets loggedInUser State
    const [loggedInUser, setLoggedInUser] = useState(null);
    useEffect(() => {
        if (Auth.loggedIn()) {
        const userData = Auth.getProfile();
        setLoggedInUser(userData.data);
        }
    }, []); // checks once

    return (
        <></>
        // <ReviewCard/>
    )


}