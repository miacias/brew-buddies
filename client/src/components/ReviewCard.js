// using both "loading card" and "inner card" components from ANT.  The Meta tag comes from "loading card" is attached to an "inner card"

import { Avatar, Card, Rate } from 'antd';
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
    </Card>
  )
};



/*
- if pathname contains something (single page), show stars as title
- if pathname is home, show breweryname as title and put stars elsewhere

- home page will show the three most recent reviews
  - change resolver query to have a .sort() that gets most recent first
  - possibly put limit of three reviews here in the resolver
- set returned api data into State so that it can be rendered on the card with the ratings from the local DB
- with new State, attempt to render name and website_url
- DONE


*/