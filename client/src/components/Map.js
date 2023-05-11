import React, { useEffect, useRef } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";


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

// oldest brewery in USA: Yuengling headquarters in PA
const center = { lat: 40.68341779790154, lng:-76.19781267415122 };
const zoom = 15;

// creates Google map
function MyMapComponent({center, zoom, breweryList}) {
    const ref = useRef();

    useEffect(() => {
        if (breweryList && breweryList.length > 0) {
            const map = new window.google.maps.Map(ref.current, {
                center: { lat: +(breweryList[0].latitude), lng: +(breweryList[0].longitude) } || center,
                zoom,
            });
            // creates a map marker for each brewery
            breweryList.forEach(brewery => {
                new window.google.maps.Marker({
                    // make case for if lat/lng is null
                    position: { lat: +(brewery.latitude), lng: +(brewery.longitude) },
                    map,
                    title: brewery.name
                })
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

