import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { EditUserForm } from "../components/EditUserForm";
import BreweryCard from "../components/BreweryCard";
import Review from "../components/Review";
import styles from "./UserProfile.module.css";
import Auth from "../utils/auth";
// import { set } from "mongoose";
// const myBreweryList = []
export function AccountPage() {
  const [showForm, setShowForm] = useState(false);
  const [breweryList, setBreweryList] = useState(new Set([]));
  const [Loading, setLoading] = useState(true);
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};
  
  useEffect(() => {
    if (!userData) {
      return <h2>Please log in!</h2>;
    }
    // if (userData.favBreweries && userData.favBreweries.length > 0) {
    //   userData.favBreweries.forEach((brewery) => {
    //     const searchByIdApi = `https://api.openbrewerydb.org/v1/breweries/${brewery}`;
    //     setLoading(true)
    //     fetch(searchByIdApi)
    //       .then((response) => response.json())
    //       .then((data) => {
    //         setLoading(false)
    //         setBreweryList(data);
    //         // myBreweryList.push(data)
    //       });
         
    //   });
    // }
    if (userData.favBreweries && userData.favBreweries.length > 0) {
      // const addData = (data) => {
      //   setBreweryList(prevArray => [...prevArray, data]);
      // }
      for (let i = 0; i < userData.favBreweries.length; i++) {
        const searchByIdApi = `https://api.openbrewerydb.org/v1/breweries/${userData.favBreweries[i]}`;
        setLoading(true)
        fetch(searchByIdApi)
          .then((response) => response.json())
          .then((data) => {
            setLoading(false)
            // console.log(data)
            // addData([data])
            // myBreweryList.push(data)
            setBreweryList(current => {
              return new Set([...current, data]) 
            })
          });
      }
        
    //  console.log(myBreweryList)
    }
    // setBreweryList(myBreweryList)

  }, [userData.favBreweries]);


 
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
            {Array.from(breweryList).map((brewery) => (
                // 
              <div>{brewery.name}</div>
            ))}
          </Col>
        </Row>
        {/* <Row>
       
          <h2>My fav breweries</h2>
          {/* {myBreweryList ? <p>My fav breweries {(myBreweryList[0].postal_code).slice(0, 5)}</p> : ""} */}
            {/* {myBreweryList.map((brewery) => (
                // 
              <div>hello</div>
            ))} */}
        {/* </Row> */} 
      </>
    );
  } else {
    return <h2>Please log in!</h2>;
  }
}
