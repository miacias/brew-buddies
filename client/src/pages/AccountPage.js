import React from "react";
import { Row, Col, Form, Input, Button, Card } from "antd";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { EditUserForm } from "../components/EditUserForm";
import BreweryCard from "../components/BreweryCard";
// import Review from "../components/Review";
import styles from "./UserProfile.module.css";
import Auth from "../utils/auth";
import { REMOVE_FAV_BREWERY } from "../utils/mutations";

export function AccountPage() {
  const [showForm, setShowForm] = useState(false);
  const [breweryList, setBreweryList] = useState(new Set([]));
  const [removeFavBrewery] = useMutation(REMOVE_FAV_BREWERY);
  const [Loading, setLoading] = useState(true);
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  useEffect(() => {
    if (!userData) {
      return <h2>Please log in!</h2>;
    }
    if (userData.favBreweries && userData.favBreweries.length > 0) {
      for (let i = 0; i < userData.favBreweries.length; i++) {
        const searchByIdApi = `https://api.openbrewerydb.org/v1/breweries/${userData.favBreweries[i]}`;
        setLoading(true);
        fetch(searchByIdApi)
          .then((response) => response.json())
          .then((data) => {
            setLoading(false);
            // We set a new set, saving the data as a new set in the array every time
            setBreweryList((current) => {
              return new Set([...current, data]);
            });
          });
      }
    }
  }, [userData.favBreweries]);

  // const [removeFavBrewery] = useMutation(REMOVE_FAV_BREWERY)
  const handleRemoveBrewery = async (breweryId) => {
    try {
      const { data } = await removeFavBrewery({
        variables: {
          breweryId: breweryId,
        },
      });
      setBreweryList((current) => {
        // Create a new set of breweries excluding the deleted brewery
        const updatedBreweries = new Set(
          [...current].filter((brewery) => brewery.id !== breweryId)
        );
        return updatedBreweries;
      });
    } catch (err) {
      console.log(err);
    }
  };

  const imageData = userData.profilePic;
  let profilePic =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  if (Auth.loggedIn()) {
    return (
      <>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : "Edit Profile"}
        </Button>
        {showForm && <EditUserForm />}
        <Row>
          <Col>
            <div>
              {imageData ? (
                <img
                  className={styles.profilePic}
                  src={imageData}
                  alt="Database profile"
                />
              ) : (
                <img
                  className={styles.profilePic}
                  src={profilePic}
                  alt="Default profile"
                />
              )}
            </div>
          </Col>
          <Col>
            <h2>
              {userData.username} {userData.postalCode}
            </h2>
            <div>{userData.birthday}</div>
            <div>{userData.pronouns}</div>
            <div>{userData.intro}</div>
            <Card title="Friend List" >
            {userData.friends && userData.friends.map((friend) => {
  return <p key={friend.username}>{friend.username}</p>
})}
            </Card>
            {Array.from(breweryList).map((brewery) => (
              //
              <Row>
                <BreweryCard brewery={brewery} key={brewery.id} handleRemoveBrewery={handleRemoveBrewery}/>
              </Row>
            ))}
          </Col>
        </Row>
      </>
    );
  } else {
    return <h2>Please log in!</h2>;
  }
}
