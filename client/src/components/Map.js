import React, { useEffect, useRef } from 'react';
import { Wrapper, Status/*, Spinner, ErrorComponent*/ } from "@googlemaps/react-wrapper";


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

// creates Google map
function MyMapComponent({center, zoom}) {
    const ref = useRef();
    useEffect(() => {
        new window.google.maps.Map(ref.current, {
            center,
            zoom,
        });
    });
    return <div ref={ref} id='map' style={{width: '100%', height: '80vh'}} />
}

export default function Map() {
    // oldest brewery in USA: Yuengling headquarters in PA
    const center = { lat: 40.68341779790154, lng:-76.19781267415122 };
    const zoom = 15;

    return (
        <Wrapper 
            apiKey='AIzaSyA1nQpf0r9XZs-qJLufySsgMevgSWXrZow'
            render={render}
        >
            <MyMapComponent 
                center={center}
                zoom={zoom}
            />
        </Wrapper>
    )
}

