// client-side packages and styles
import { React, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Col, Card, Space, Button, Tooltip } from "antd";
import { StarOutlined, StarFilled, HeartOutlined, HeartFilled, DoubleRightOutlined, PhoneOutlined } from "@ant-design/icons";
import styles from '../components/BreweryCard.module.css';
// client-side utils, pages, components
import Auth from '../utils/auth';
import formatPhoneNumber from '../utils/phoneFormat';
import formatZipCode from "../utils/zipFormat";
import breweryType from '../utils/breweryType';
import { ADD_FAV_BREWERY, REMOVE_FAV_BREWERY } from "../utils/mutations";
import { GET_ME, BREWERY_REVIEW } from '../utils/queries';
import ReviewCard from "../components/ReviewCard";
import AddReviewForm from '../components/AddReviewForm';


export default function SingleBrewery() {
  const { breweryId } = useParams();
  const [breweryData, setBreweryData] = useState();
  const [showForm, setShowForm] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [favorite, setFavorite] = useState();

  // adds or removes brewery from user Favorites list
  const [addFavBrewery, { error }] = useMutation(ADD_FAV_BREWERY);
  const [removeFavBrewery, { error: removeError }] = useMutation(REMOVE_FAV_BREWERY);
  // loads all reviews for this brewery
  const { loading: loadingReview, data: reviewData, refetch } = useQuery(BREWERY_REVIEW, { variables: { breweryId }});
  // loads logged in user data
  const { loading: loadingMe, error: meError, data: meData, refetch: refetchMe } = useQuery(GET_ME);


  // heart icon is filled if brewery on screen is in the favorites list of the user viewing the page
  const handleHeartFill = async (brewery) => {
    const myFaves = meData?.me?.favBreweries;
    const breweryId = brewery?.id.toString();
    if (myFaves && myFaves.length > 0) {
      const foundMatch = myFaves.find((favMatch) => favMatch === breweryId)
      if (foundMatch) {
        return setFavorite(true);
      } else {
        return setFavorite(false);
      }
    }
  }

  // checks if user data is loaded then fills in the favorite heart or not
  useEffect(() => {
    if(meData) {
      handleHeartFill(breweryData);
    }
  }, [meData, breweryData]);


  // console.log('my fav array', myFaves)
  // console.log('brew data from state', breweryData?.id)
  // use .includes(to return the match)
  // console.log(myFaves.includes(breweryData?.id))

  // calculates star review average
  const calculateAverage = (loadingReview, reviewData) => {
    const ratings = [];
    let average;
    let totalReviews;
    if (!loadingReview && reviewData.review) {
      reviewData.review.forEach(review => {
        return ratings.push(parseInt(review.starRating));
      });
      const initialValue = 0;
      const sumWithInitial = ratings.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      );
      average = sumWithInitial / ratings.length;
      totalReviews = ratings.length;
      return [average, totalReviews];
    }
  }

  // calls OpenBreweryDB API and sets breweryData State
  useEffect(() => {
    const searchByIdApi = `https://api.openbrewerydb.org/v1/breweries/${breweryId}`;
    fetch(searchByIdApi)
      .then((response) => response.json())
      .then((data) => {
        setBreweryData(data);
        handleHeartFill(data);
      })
      .catch((error) => console.error(error));
  }, [breweryId]);

  // verifies if user is logged in and sets loggedInUser State
  useEffect(() => {
    if (Auth.loggedIn()) {
      const userData = Auth.getProfile();
      setLoggedInUser(userData.data);
    }
  }, []); // checks once


  // refetches brewery review data, used as a prop and passed through form component
  const handleReviewAdded = () => {
    refetch();
  };

  // adds review to brewery page and to user profile
  const handleAddFavBrewery = async (event) => {
    try {
      const { data } = await addFavBrewery({
        variables: {
          breweryId: breweryId,
        },
      });
      if (!data) {
        throw new Error('Something went wrong!');
      }
        setFavorite(true);
    } catch (err) {
      console.error(err);
    }
  };

  if(loggedInUser !== null) {
    return (
      <>
        {breweryData && (
          <>
            <Col >
              <Card 
                className={styles.singleBrewery} 
                title={breweryData?.name} 
                bordered={false}
              >
                {breweryData.brewery_type && (
                <p>Brewery Flavor: {breweryType(breweryData?.brewery_type)}</p>
                )}
                {/* phone number */}
                {breweryData.phone && (<div>
                  <span style={{ display: 'inline-block', marginRight: '10px' }}>
                    <PhoneOutlined />
                  </span>
                  <span style={{ display: 'inline-block', marginRight: '10px' }}>
                    <p>{formatPhoneNumber(breweryData?.phone)}</p>
                  </span>
                </div>)}
                {/* street address */}
                <p>{breweryData?.street}</p>
                <p>{breweryData?.city}, {breweryData?.state} {breweryData.postal_code && (formatZipCode(breweryData?.postal_code))}</p>
                  <Space.Compact block>
                    {/* star ratings! */}
                    {!loadingReview && reviewData.review && (
                    <Tooltip title={`${calculateAverage(loadingReview, reviewData)[1]} ratings!`}>
                      <Button 
                        type={showForm ? 'primary': 'default'}
                        icon={<StarOutlined />}
                        onClick={() => setShowForm(!showForm)}
                      > 
                      {/* shows average ratings, if any. shows Cancel when form is open */}
                        {
                          !showForm
                            ? isNaN(calculateAverage(loadingReview, reviewData)[0])
                              ? 'No reviews'
                              : `${calculateAverage(loadingReview, reviewData)[0]} out of 5`
                            : 'Cancel'
                        }
                      </Button>
                    </Tooltip>
                    )}
                    {/* add to favorites! */}
                    <Tooltip title="I love it!">
                      <Button 
                        icon={favorite ? <HeartFilled /> : <HeartOutlined />}
                        onClick={handleAddFavBrewery}
                      >Favorite it!</Button>
                    </Tooltip>
                    {/* external website button if site exists */}
                    {breweryData?.website_url && 
                    (<Tooltip title='View site!'>
                      <Button icon={<DoubleRightOutlined />} href={breweryData?.website_url} />
                    </Tooltip>)}
                </Space.Compact>
                {/* shows/hides Add Review form based on showForm State */}
                {showForm && 
                <AddReviewForm 
                  showForm={showForm} 
                  setShowForm={setShowForm}
                  onReviewAdded={handleReviewAdded} 
                />}
              </Card>
            </Col>
          </>
        )}

        {/* <div>Google Maps API here</div> */}
        <ul>
          {/* creates Review card based on total number of reviews possible */}
          {!loadingReview && reviewData.review && (
            <>
            {reviewData.review.map((oneReview) => {
              return <ReviewCard 
                oneReview={oneReview} 
                key={oneReview._id}
                breweryData={breweryData}
              />
            })}
            </>
          )}
        </ul>
      </>
    );
  } else {
    return <div>Please log in!</div>
  }
}
