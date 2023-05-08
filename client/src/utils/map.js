import { Loader } from '@googlemaps/js-api-loader';
require('dotenv').config();

let map;

const loader = new Loader({
  apiKey: process.env.GOOGLE_MAPS_FRED,
  version: 'weekly',
  // ...additionalOptions,
});

loader.load()
    .then(async () => {
        const { Map } = await google.maps.importLibrary('maps');

    map = new Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
});
