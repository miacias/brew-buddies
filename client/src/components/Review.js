// change name to review card

// We are using both the "loading card" and "inner card" components from ANT.  The Meta tag comes from "loading card" that we attached to an "inner card"

import { Avatar, Card, } from 'antd';
const { Meta } = Card;


const Review = ({ oneReview, breweryData }) => (
  <Card>
    {/* {console.log(oneReview)} */}
    <Meta
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
          title="Review Creator"
          description="Review posted on"
        />
    <Card
      style={{
        marginTop: 16,
      }}
      type="inner"
      title={`Brewery name ${breweryData.name}`}
    //   extra={<a href="#">More</a>}  <<<<  a more link
    >
      Star Review {oneReview.starRating}
      Review : {oneReview.reviewText}
      by {oneReview.reviewAuthor}
      on {oneReview.createdAt}
    </Card>
  </Card>
);
export default Review;