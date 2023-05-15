
import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Row, Col, Button, Card } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER, GET_ME } from "../utils/queries";
import { ADD_FRIEND, REMOVE_FRIEND } from "../utils/mutations";
import styles from "./UserProfile.module.css";
const ObjectId = require("bson-objectid");

export function UserProfile() {
  const [addFriend] = useMutation(ADD_FRIEND);
  const [removeFriend] = useMutation(REMOVE_FRIEND);
  const navigate = useNavigate();

  const { username } = useParams();
  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery(GET_USER, {
    variables: { username },
  });
  const userData = dataUser?.user;
  const {
    loading: loadingMe,
    error: errorMe,
    data: dataMe,
    refetch,
  } = useQuery(GET_ME);
  const meData = dataMe;
  const imageData = userData?.profilePic;
  let profilePic =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  if (!userData) {
    return <div>Loading...</div>; // return a loading state if userData is falsy
  }

  const handleFollowFriend = async () => {
    try {
      const { data } = await addFriend({
        variables: {
          friendId: new ObjectId(userData._id),
        },
      });
      refetch();
      if (!data) {
        throw new Error("You have no friends");
      }
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveFriend = async (friendId) => {
    try {
      const { data } = await removeFriend({
        variables: {
          friendId: new ObjectId(friendId),
        },
      });
      refetch();
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

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
          <h2>
            {userData.username} {userData.postalCode}
          </h2>
          <div>{userData.birthday}</div>
          <div>{userData.pronouns}</div>
          <div>{userData.intro}</div>
        </Col>
      </Row>
      {/* had to add meData to the check to get rid of error upon initial page load.  Also removed length check as it was unnecessary.  The actual is changing map() to some() */}
      {meData && (
        meData.me.friends.some((friend) => friend.username === userData.username) ? (
          <Button onClick={() => handleRemoveFriend(userData._id)}>
            Remove Friend
          </Button>
        ) : (
          <Button onClick={handleFollowFriend}>Add Friend</Button>
        )
      )}
      <Card title="Friend List">        
        {console.log(userData.friends)}
        {userData?.friends && userData.friends.length > 0 ? (
          userData.friends.map((friend) => (
            <ul>
             <li>
              <Link to={`/profile/${friend.username}`} key={friend.username}>{friend.username}</Link>
              </li>
            </ul>
          ))
        ) : (
          <p>They have no friends to show yet!</p>
        )}
      </Card>
    </>
  );
}