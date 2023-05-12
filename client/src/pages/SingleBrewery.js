import { React, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
// import BreweryCard from "../components/BreweryCard";
import Review from "../components/Review";
import AddReviewForm from '../components/AddReviewForm';
import { ADD_FAV_BREWERY } from "../utils/mutations";
import { ADD_REVIEW } from "../utils/mutations";
import { useParams } from "react-router-dom";
import { Col, Card, Button/*, Row*/ } from "antd";
import { GET_ME } from "../utils/queries";
const ObjectId = require("bson-objectid");

export default function SingleBrewery() {
  const { breweryId } = useParams();
  const formattedId = breweryId.substring(1);
  const [breweryData, setBreweryData] = useState();
  const [showForm, setShowForm] = useState(false);

  // calls OpenBreweryDB API and sets breweryData State
  useEffect(() => {
    const searchByIdApi = `https://api.openbrewerydb.org/v1/breweries/${formattedId}`;
    fetch(searchByIdApi)
      .then((response) => response.json())
      .then((data) => setBreweryData(data))
      .catch((error) => console.error(error));
  }, [formattedId]);

  // adds brewery to user favorites list
  const [addFavBrewery, { error }] = useMutation(ADD_FAV_BREWERY);
  // adds review to brewery page and to user profile
  // const [ addReview ] = useMutation(ADD_REVIEW);
  // retrieves user ID so user can add favorites
  const { loading, data } = useQuery(GET_ME);

  const userData = data?.me || {};
  if (!userData) {
    return <h2>Please log in!</h2>;
  }
  const _id = new ObjectId(userData._id);

  const handleAddFavBrewery = async (event) => {
    // const breweryObject = new ObjectId(formattedId)
    try {
      const { data } = await addFavBrewery({
        variables: {
          breweryId: formattedId,
        },
      });
      if (!data) {
        throw new Error('Something went wrong!');
      }
    } catch (err) {
      console.error(err);
    }
  };

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
        {/* <li><Review/></li>
                <li><Review/></li>
                <li><Review/></li> */}
      </ul>
    </>
  );
}
