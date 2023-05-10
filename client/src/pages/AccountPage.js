import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { EditUserForm } from "../components/EditUserForm"
import BreweryCard from "../components/BreweryCard";
import Review from "../components/Review";
import styles from './UserProfile.module.css';



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


  
    return (
        
      <>
      <Button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close" : "Edit Profile"} 
      </Button>
      {showForm && (
        <EditUserForm />
      )}
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
          <h2>My fav breweries</h2>
          <Review/>
          <Review/>
          <Review/>
        </Row>
       
      </>
    );
  }

//   add an edit button where react checks to see if you are in edit mode and then if so adds in a form where we can resubmit where the forms state is set to the get me query
// function MyComponent() {
//   const [myData, setMyData] = useState(null);

//   const { loading, error, data } = useQuery(gql`
//     query GetMyData {
//       myData {
//         id
//         name
//         description
//       }
//     }
//   `);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;

//   if (data && data.myData) {
//     setMyData(data.myData);
//   }

//   return (
//     <div>
//       <h1>{myData?.name}</h1>
//       <p>{myData?.description}</p>
//     </div>
//   );
// }
