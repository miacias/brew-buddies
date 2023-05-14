import { React, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
// import BreweryCard from "../components/BreweryCard";
import ReviewCard from "../components/ReviewCard";
import AddReviewForm from '../components/AddReviewForm';
import Auth from '../utils/auth'
import { ADD_FAV_BREWERY } from "../utils/mutations";
import { BREWERY_REVIEW } from '../utils/queries';
import { useParams } from "react-router-dom";
import { Col, Card, Button/*, Row*/ } from "antd";
import styles from '../components/BreweryCard.module.css'

export default function SingleBrewery() {
  const { breweryId } = useParams();
  const [breweryData, setBreweryData] = useState();
  const [showForm, setShowForm] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // calls OpenBreweryDB API and sets breweryData State
  useEffect(() => {
    const searchByIdApi = `https://api.openbrewerydb.org/v1/breweries/${breweryId}`;
    fetch(searchByIdApi)
      .then((response) => response.json())
      .then((data) => setBreweryData(data))
      .catch((error) => console.error(error));
  }, [breweryId]);

  // verifies if user is logged in and sets loggedInUser State
  useEffect(() => {
    if (Auth.loggedIn()) {
      const userData = Auth.getProfile();
      setLoggedInUser(userData.data);
    }
  }, []); // checks once

  // adds brewery to user favorites list
  const [addFavBrewery, { error }] = useMutation(ADD_FAV_BREWERY);
  const { loading, data } = useQuery(BREWERY_REVIEW, { variables: { breweryId }});
  // adds review to brewery page and to user profile

  const handleAddFavBrewery = async (event) => {
    try {
      const { data } = await addFavBrewery({
        variables: {
          breweryId: breweryId,
        },
      });
      if (!data) {
        throw new Error('Something went wrong!');
      }
      console.log("woohoo")
    } catch (err) {
      console.error(err);
    }
  };

  if(loggedInUser !== null) {
    return (
      <>
        {breweryData && (
          <>
            <Col >
              <Card className={styles.singleBrewery} title={breweryData.name} bordered={false}>
                <p>Brewery Type: {breweryData.brewery_type}</p>
                <p>
                  Address: {breweryData.street}, {breweryData.city}, {" "}
                  {breweryData.state} {breweryData.postal_code}
                </p>
                <Button onClick={handleAddFavBrewery}>
                  Save Brewery to Favorites
                </Button>
                {showForm && <AddReviewForm showForm={showForm} setShowForm={setShowForm}/>}
                <Button onClick={() => setShowForm(!showForm)}>
                  {showForm ? 'Cancel' : 'Add Review'}
                </Button>
              </Card>
            </Col>
          </>
        )}

        <div>Google Maps API here</div>
        <ul>
          {/* creates Review card based on total number of reviews possible */}
          {!loading && data.review && (
            <>
            {data.review.map((oneReview) => {
              return <ReviewCard 
                oneReview={oneReview} 
                key={oneReview._id}
                breweryData={breweryData}
              />
            })}
            </>
          )}
        </ul>
      </>
    );
  } else {
    return <div>Please log in!</div>
  }
}
