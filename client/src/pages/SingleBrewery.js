import { React, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
// import BreweryCard from "../components/BreweryCard";
import Review from "../components/Review";
import AddReviewForm from '../components/AddReviewForm';
import Auth from '../utils/auth'
import { ADD_FAV_BREWERY } from "../utils/mutations";
import { ADD_REVIEW } from "../utils/mutations";
import { BREWERY_REVIEW } from '../utils/queries';
import { useParams } from "react-router-dom";
import { Col, Card, Button/*, Row*/ } from "antd";
// import { GET_ME } from "../utils/queries";

export default function SingleBrewery() {
  const { breweryId } = useParams();
  const [breweryData, setBreweryData] = useState();
  const [showForm, setShowForm] = useState(false);

  // calls OpenBreweryDB API and sets breweryData State
  useEffect(() => {
    const searchByIdApi = `https://api.openbrewerydb.org/v1/breweries/${breweryId}`;
    fetch(searchByIdApi)
      .then((response) => response.json())
      .then((data) => setBreweryData(data))
      .catch((error) => console.error(error));
  }, [breweryId]);

  // adds brewery to user favorites list
  const [addFavBrewery, { error }] = useMutation(ADD_FAV_BREWERY);
  const { loading, data } = useQuery(BREWERY_REVIEW, { variables: { breweryId }});
  // adds review to brewery page and to user profile
  // const [ addReview ] = useMutation(ADD_REVIEW);
  // retrieves user ID so user can add favorites -> refactor. get ID from token.
  /*
  - server side is using _id in the payload during SignToken, so _id can be retrieved through the token instead of GET_ME
  - client side utils auth.js can use getToken() to decode the token and retrieve this value from localStorage  
  
  */
  // const { loading, data } = useQuery(GET_ME);

  // const userData = data?.me || {};
  // if (!userData) {
  //   return <h2>Please log in!</h2>;
  // }
  // const _id = new ObjectId(userData._id);

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
  if(Auth.loggedIn()) {
  return (
    <>
      {breweryData && (
        <>
          <Col span={8}>
            <Card title={breweryData.name} bordered={false}>
              <p>Brewery Type: {breweryData.brewery_type}</p>
              <p>
                Address: {breweryData.street}, {breweryData.city},{" "}
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
        <div>reviews by review.length</div>
        {!loading && data.review && (
          <>
          {data.review.map((oneReview) => {
            return <Review oneReview={oneReview}/>
          })}
          </>
        )}
        {/* <li><Review/></li>
                <li><Review/></li>
                <li><Review/></li> */}
      </ul>
    </>
  );
} else {
 return <div>Please log in!</div>
}}
