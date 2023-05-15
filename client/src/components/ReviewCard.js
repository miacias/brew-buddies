// using both "loading card" and "inner card" components from ANT.  The Meta tag comes from "loading card" is attached to an "inner card"
import { Link } from 'react-router-dom';
import { Avatar, Card, Rate, Button } from 'antd';
const { Meta } = Card;


export default function ReviewCard({ oneReview, breweryData }) {
  let urlParams = window.location.pathname;

  return (
    <Card>
      <Meta
            avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
            title={oneReview.reviewAuthor}
            description={oneReview.createdAt}
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
          <Rate disabled defaultValue={oneReview.starRating}/>
          <p>{oneReview.reviewText}</p>
        </Card>
      : // else render card with brewery star rating as title
        <Card
          style={{
            marginTop: 16,
          }}
          type="inner"
          title={<Rate disabled defaultValue={oneReview.starRating}/>}
        >
          <p>{oneReview.reviewText}</p>
        </Card>
      }
      <Button >
        <Link to={`/profile/${oneReview.reviewAuthor}`}>
          View Profile!
        </Link>
      </Button>
    </Card>
  )
};