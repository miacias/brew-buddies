import React, { useEffect, useRef } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
const svgMarker = require('./beerMug.svg').default;

// rendered status: loading, error, or success
const render = (status) => {
    switch (status) {
    //   case Status.LOADING:
        // return <Spinner />;
    //   case Status.FAILURE:
        // return <ErrorComponent />;
      case Status.SUCCESS:
        return <MyMapComponent />;
      default: return null
    }
};

// oldest brewery in USA: Yuengling headquarters in PA (17901)
const center = { lat: 40.68341779790154, lng:-76.19781267415122 };
const zoom = 14.2;
// creates Google map
function MyMapComponent({center, zoom, breweryList}) {
    const ref = useRef();

    useEffect(() => {
        if (breweryList && breweryList.length > 0) {
            // filters out breweries with null coordinates
            const mapBreweries = breweryList.filter(brewery => brewery.latitude !== null && brewery.longitude !== null);
            const map = new window.google.maps.Map(ref.current, {
                // centers on first result
                center: { 
                    lat: +mapBreweries[0].latitude, 
                    lng: +mapBreweries[0].longitude 
                },
                zoom,
            });
            // creates a map marker for each brewery
            mapBreweries.forEach(brewery => {
                // removes null values, if any
                    new window.google.maps.Marker({
                        // make case for if lat/lng is null
                        position: { 
                            lat: +(brewery.latitude) ? +(brewery.latitude) : null, 
                            lng: +(brewery.longitude) ? +(brewery.longitude) : null
                        },
                        map,
                        title: brewery.name,
                        icon: svgMarker
                    });
            });
        }
    }, [breweryList, center, zoom]);
    return <div ref={ref} id='map' style={{width: '100%', height: '80vh'}} />
}

export default function Map({ breweryList }) {

    return (
        <Wrapper 
            apiKey='AIzaSyA1nQpf0r9XZs-qJLufySsgMevgSWXrZow'
            render={render}
        >
            <MyMapComponent 
                center={center}
                zoom={zoom}
                breweryList={breweryList}
            />
        </Wrapper>
    )
}
