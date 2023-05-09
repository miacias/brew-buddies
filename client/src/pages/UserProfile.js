import React from "react";
import { Row, Col } from "antd";
// import 'antd/dist/antd.css';
import BreweryCard from "../components/BreweryCard";
import Review from "../components/Review";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { ExclamationCircleFilled } from "@ant-design/icons";
import "../App.css";

export function UserProfile() {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};
  if (!userData) {
    return <h2>Please log in!</h2>;
  }
  const imageData = userData.profilePic;
  let profilePic =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  console.log(userData);

  return (
    <>
      <Row>
        <Col>
          <div>
            {imageData ? (
              <img
                className="profilePic"
                src={imageData}
                alt="Database Image"
              />
            ) : (
              <img
                className="profilePic"
                src={profilePic}
                alt="Default Image"
              />
            )}
          </div>
          {/* <div>{userData.birthday}</div> */}
        </Col>
        <Col>
          <h2>{userData.username} {userData.postalCode}</h2>
          <div>{userData.birthday}</div>
          {/* <h2>{userData.postalCode}</h2> */}
          <div>{userData.pronouns}</div>
          <div>{userData.intro}</div>
        </Col>
      </Row>
      <Row>
        <h2>My most recent reviews</h2>
        <Review/>
        <Review/>
        <Review/>
      </Row>
      <Row>
        <h2>Places I hope to go</h2>
        <BreweryCard/>
        <BreweryCard/>
        <BreweryCard/>
      </Row>
    </>
  );
}

