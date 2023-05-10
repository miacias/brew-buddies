import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { EditUserForm } from "../components/EditUserForm";
import BreweryCard from "../components/BreweryCard";
import Review from "../components/Review";
import styles from "./UserProfile.module.css";
import Auth from "../utils/auth";

export function AccountPage() {
  const [showForm, setShowForm] = useState(false);
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};
  if (!userData) {
    return <h2>Please log in!</h2>;
  }

  const imageData = userData.profilePic;
  let profilePic =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  console.log(userData);

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
          </Col>
        </Row>
        <Row>
          <h2>My fav breweries</h2>
          <Review />
          <Review />
          <Review />
        </Row>
      </>
    );
  } else {
    return <h2>Please log in!</h2>;
  }
}


