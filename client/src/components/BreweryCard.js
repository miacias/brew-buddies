// "id": "b54b16e1-ac3b-4bff-a11f-f7ae9ddc27e0",
// "name": "MadTree Brewing 2.0",
// "brewery_type": "regional",
// "address_1": "5164 Kennedy Ave",
// "address_2": null,
// "address_3": null,
// "city": "Cincinnati",
// "state_province": "Ohio",
// "postal_code": "45213",
// "country": "United States",
// "longitude": "-84.4137736",
// "latitude": "39.1885752",
// "phone": "5138368733",
// "website_url": "http://www.madtreebrewing.com",
// "state": "Ohio",
// "street": "5164 Kennedy Ave"


import { Card, Col, Row } from 'antd';

const breweryCard = (props) => {
  const breweryId = props.brewery.id
  const url = `/${breweryId}`
  return (
    <Col span={8}>
      <Card title={props.brewery.name} bordered={false}>
        <p>Brewery Type: {props.brewery.brewery_type}</p>
        <p>Address: {props.brewery.street}, {props.brewery.city}, {props.brewery.state} {props.brewery.postal_code}</p>
        <p><a href={url}>Click here for more information!</a></p>
      </Card>
    </Col>
  )
};

export default breweryCard;
