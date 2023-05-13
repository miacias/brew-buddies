import { React, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Review from "../components/Review";
import Auth from '../utils/auth'
import { ADD_FAV_BREWERY } from "../utils/mutations";
import { ADD_REVIEW } from "../utils/mutations";
import { useParams } from "react-router-dom";
import { Col, Card, Button, Row } from "antd";
import { GET_ME } from "../utils/queries";

export default function SingleBrewery() {
  const { breweryId } = useParams();
  const [breweryData, setBreweryData] = useState();

  useEffect(() => {
    const searchByIdApi = `https://api.openbrewerydb.org/v1/breweries/${breweryId}`;
    fetch(searchByIdApi)
      .then((response) => response.json())
      .then((data) => setBreweryData(data))
      .catch((error) => console.error(error));
  }, [breweryId]);

  const [addBrewery] = useMutation(ADD_FAV_BREWERY);
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};
  if (!userData) {
    return <h2>Please log in!</h2>;
  }
  //   const [ addReview ] = useMutation(ADD_REVIEW)

  const handleAddBrewery = async (event) => {
    try {
      const { data } = await addBrewery({
        variables: {
          breweryId: breweryId,
        },
      });
      if (!data) {
        throw new Error("something went wrong!");
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
        <Col span={8}>
          <Card title={breweryData.name} bordered={false}>
            <p>Brewery Type: {breweryData.brewery_type}</p>
            <p>
              Address: {breweryData.street}, {breweryData.city},{" "}
              {breweryData.state} {breweryData.postal_code}
            </p>
            <Button onClick={handleAddBrewery}>
              Save Brewery to Favorites
            </Button>
            <Button>Add Review</Button>
          </Card>
        </Col>
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
} else {
 return <div>Please log in!</div>
}}
