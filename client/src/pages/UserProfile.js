import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button } from "antd";
// import 'antd/dist/antd.css';
// import BreweryCard from "../components/BreweryCard";
// import ReviewCard from "../components/ReviewCard";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "../utils/queries";
import { ADD_FRIEND } from "../utils/mutations";
// import Auth from "../utils/auth";
// import { ExclamationCircleFilled } from "@ant-design/icons";
import styles from './UserProfile.module.css';
import { useResetProjection } from "framer-motion";
const ObjectId = require("bson-objectid");



export function UserProfile() {
const [addFriend] = useMutation(ADD_FRIEND);
const navigate = useNavigate();


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
  const handleFollowFriend = async () => {
    console.log(new ObjectId(userData._id))
    try {
      const { data } = await addFriend({
        variables: {
          friendId: new ObjectId(userData._id)
        },
      });
      if (!data) {
        throw new Error('You have no friends');
      }
      navigate('/profile')
      } catch (err) {
        console.error(err);
      }
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
      <Button onClick = {handleFollowFriend}>
              Add Friend
      </Button>
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

