// change name to review card

// We are using both the "loading card" and "inner card" components from ANT.  The Meta tag comes from "loading card" that we attached to an "inner card"

import { Avatar, Card, Rate } from 'antd';
const { Meta } = Card;


const ReviewCard = ({ oneReview }) => (
  <Card>
    <Meta
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
          title={oneReview.reviewAuthor}
          description={oneReview.createdAt}
        />
    <Card
      style={{
        marginTop: 16,
      }}
      type="inner"
      title={
        <Rate disabled defaultValue={oneReview.starRating}/>
      }
    >
      {oneReview.reviewText}
    </Card>
  </Card>
);
export default ReviewCard;