// using both "loading card" and "inner card" components from ANT.  The Meta tag comes from "loading card" is attached to an "inner card"

import { Avatar, Card, Rate, Button } from 'antd';
const { Meta } = Card;


export default function ReviewCard({ oneReview, breweryData, handleBreweryMatch }) {
  let urlParams = window.location.pathname;
  // const breweryArr = [...breweryData]
  // console.log(breweryArr);
  // set up card to display incoming info

  return (
    <>
      {oneReview && breweryData && (
        <Card>
          {/* {handleBreweryMatch()} */}
        <Meta
              // avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
              avatar={<Avatar src={oneReview.author.profilePic ? oneReview.author.profilePic : 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1'} />}
              title={oneReview.review.reviewAuthor}
              description={oneReview.review.createdAt}
            />
        {/* if on home page, render card with brewery title */}
        {urlParams === '/' ?
          <Card
          style={{
            marginTop: 16,
          }}
          type="inner"
          title={<a href={breweryData.website_url ? breweryData.website_url : ''}>{breweryData?.name}</a>}
          >
            <Rate disabled defaultValue={oneReview.review.starRating}/>
            <p>{oneReview.review.reviewText}</p>
          </Card>
        : // else render card with brewery star rating as title
          <Card
            style={{
              marginTop: 16,
            }}
            type="inner"
            title={<Rate disabled defaultValue={oneReview.review.starRating}/>}
          >
            <p>{oneReview.review.reviewText}</p>
          </Card>
        }
        <Button href={`/profile/${oneReview.review.reviewAuthor}`}  >
          View Profile!
          </Button>
      </Card>
      )}
    </>
  )
};