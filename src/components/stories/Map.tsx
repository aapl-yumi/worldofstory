import React, { useRef } from 'react';

import { GoogleMap, Polygon, useLoadScript } from '@react-google-maps/api';

import countries from './country.json';
import MapZoomButtons from './MapZoomButtons';

import type { Search } from "./MapAndStories";
const center = { lat: 26.6, lng: -14.75 };

export default function Map({
  search,
  setSearch,
}: {
  search: Search;
  setSearch: (search: Search) => void;
}) {
  const { isLoaded, loadError, url } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCygqZsRbwZWT1bG0ihIkuOe4ZhlronUOI",
  });

  const handleZoomIn = () => {
    console.log("zoom in");
  };
  const handleZoomOut = () => {
    console.log("zoom out");
  };

  const onCountryClick = (country: any) => {
    setSearch({ ...search, country: country.iso });
    document.getElementById("search")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="h-[80vh] w-full relative">
      {isLoaded && (
        <>
          <GoogleMap
            id="map"
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={center}
            zoom={2}
            options={{
              disableDefaultUI: true,
              mapId: "cfdc1dc59fd233b6",
            }}
          >
            {countries.map((country, i) => {
              let paths: any[] = [];
              let countryCoords: any[] = [];
              let co: any[] = [];

              if ("multi" in country) {
                let ccArray: any = [];

                for (let t in country.xml.Polygon) {
                  countryCoords = [];

                  co =
                    country.xml.Polygon[
                      parseInt(t)
                    ].outerBoundaryIs.LinearRing.coordinates.split(" ");

                  for (let j in co) {
                    let coo = co[j].split(",");
                    countryCoords.push({
                      lat: parseFloat(coo[1]),
                      lng: parseFloat(coo[0]),
                    });
                  }

                  ccArray.push(countryCoords);
                }

                paths = ccArray;
              } else {
                countryCoords = [];

                co =
                  country.xml.outerBoundaryIs.LinearRing.coordinates.split(" ");

                for (let j in co) {
                  let coo = co[j].split(",");
                  countryCoords.push({
                    lat: parseFloat(coo[1]),
                    lng: parseFloat(coo[0]),
                  });
                }

                paths = countryCoords;
              }
              return (
                <Polygon
                  key={country.iso + "-" + i}
                  paths={paths}
                  options={{
                    fillOpacity: 0,
                    strokeOpacity: 0,
                    strokeWeight: 1,
                    clickable: true,
                  }}
                  onClick={() => onCountryClick(country)}
                  onMouseOver={() => {}}
                />
              );
            })}
          </GoogleMap>
          <MapZoomButtons
            handleZoomIn={handleZoomIn}
            handleZoomOut={handleZoomOut}
          />
        </>
      )}
    </div>
  );
}
