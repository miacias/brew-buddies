import {React, useState, useEffect } from 'react';
import BreweryCard from '../components/BreweryCard'
import Review from '../components/Review'
import { useParams } from 'react-router-dom';
import {Col, Card, Button, Row} from 'antd'

export default function SingleBrewery() {
    const { breweryId } = useParams();
    const formattedId = breweryId.substring(1);
    const [breweryData, setBreweryData] = useState()
    console.log(breweryId)
    useEffect(() => {
    const searchByIdApi = `https://api.openbrewerydb.org/v1/breweries/${formattedId}`;
    fetch(searchByIdApi)
      .then((response) => response.json())
      .then((data) => setBreweryData(data))
      .catch((error) => console.error(error));
  }, [formattedId]);
    return (
        <>
          {breweryData && (
            <Col span={8}>
              <Card title={breweryData.name} bordered={false}>
                <p>Brewery Type: {breweryData.brewery_type}</p>
                <p>
                  Address: {breweryData.street}, {breweryData.city}, {breweryData.state}{' '}
                  {breweryData.postal_code}
                </p>
              </Card>
            </Col>
          )}
          <div>Google Maps API here</div>
          <ul>
            <div>reviews by review.length</div>
            {/* <li><Review/></li>
                <li><Review/></li>
                <li><Review/></li> */}
          </ul>
        </>
      );
    }

