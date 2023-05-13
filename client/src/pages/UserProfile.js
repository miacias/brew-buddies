import React from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "antd";
// import 'antd/dist/antd.css';
import BreweryCard from "../components/BreweryCard";
import ReviewCard from "../components/ReviewCard";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "../utils/queries";
import Auth from "../utils/auth";
// import { ExclamationCircleFilled } from "@ant-design/icons";
import styles from './UserProfile.module.css';

export function UserProfile() {
  const { username } = useParams();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { username },
  }); 
  const userData = data?.user
  const imageData = userData?.profilePic;
  let profilePic =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  console.log(userData);
  if (!userData) {
    return <div>Loading...</div>; // return a loading state if userData is falsy
  }
  
  return (
    <>
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
          <h2>{userData.username} {userData.postalCode}</h2>
          <div>{userData.birthday}</div>
          <div>{userData.pronouns}</div>
          <div>{userData.intro}</div>
        </Col>
      </Row>
      <Row>
        <h2>My most recent reviews</h2>
        {/* <ReviewCard/>
        <ReviewCard/>
        <ReviewCard/> */}
      </Row>
      <Row>
        <h2>Places I hope to go</h2>
        {/* <BreweryCard/>
        <BreweryCard/>
        <BreweryCard/> */}
      </Row>
    </>
  );
}

