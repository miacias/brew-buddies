import React from 'react';
import { useState } from 'react'
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';

// oldest brewery in USA: Yuengling headquarters
const center = { lat: 40.68341779790154, lng:-76.19781267415122 }

export default function Map() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyB3k4AwapYhD-ByAscJM5DLVe00chcNIOY'
    });
    const [map, setMap] = useState( /** @type google.maps.GoogleMap */ (null));
    // shows a loading message on screen before map renders to page
    if (!isLoaded) {
        return (<div>Map loading in progress!</div>)
    }

    return (
        <>
            <div>hi, this is a map</div>
            <div 
                position='absolute'
                left={0}
                top={0}
                height='100%'
                width='100%' 
            >
                <GoogleMap 
                    center={center}
                    zoom={15}
                    mapContainerStyle={{width: '100%', height:'100%'}}
                    onLoad={(map) => setMap(map)}
                >
                    {/* possible to add as many markers as needed. */}
                    {/* dynamically render marker components based on returned array of locations */}
                    <Marker position={center}/>
                </GoogleMap>
            </div>
            
            <button 
                aria-label='center map'
                // change onclick "center" to first location in array of breweries
                onClick={() => map.panTo(center)}
            >Center Map</button>
            {/* <script async
                src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyB3k4AwapYhD-ByAscJM5DLVe00chcNIOY&callback=${initMap}`}>
            </script> */}
            {/* <script>
                {(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set(),e=new URLSearchParams(),u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
                    key: 'AIzaSyB3k4AwapYhD-ByAscJM5DLVe00chcNIOY',
                    // Add other bootstrap parameters as needed, using camel case.
                    // Use the 'v' parameter to indicate the version to load (alpha, beta, weekly, etc.)
                })}
            </script> */}
            {/* <div id='map'></div> */}
        </>
    )
}

