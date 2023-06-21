import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import PlaceIcon from "@mui/icons-material/Place";
import { getCityInfo } from "../queries/query";
const googleMapCredentials = require("../credentials/google_credentials.json");

function MapView({ mapCenter, poiList, mapHeight, zoom }) {
  const [mapList, setMapList] = useState(null);

  useEffect(() => {
    if (!poiList) {
      return;
    }
    setMapList(
      poiList.map((item) => {
        return {
          google_place_id: item.place_id,
          lat: item.geometry.location.lat,
          lon: item.geometry.location.lng,
        };
      })
    );
  }, [poiList]);

  console.log(mapList);

  return (
    <div style={{ height: `${mapHeight}vh`, width: "100%" }}>
      <GoogleMapReact
        key={mapList?.length}
        options={{ gestureHandling: "none", disableDefaultUI: true }}
        bootstrapURLKeys={{ key: googleMapCredentials.mapApiKey }}
        defaultCenter={mapCenter}
        defaultZoom={zoom}>
        {mapList?.map((googleLocationInfo) => {
          <PlaceIcon
            key={googleLocationInfo.google_place_id}
            fontSize="large"
            sx={{ color: "#f44336" }}
            lat={googleLocationInfo.lat}
            lng={googleLocationInfo.lon}
          />;
        })}
      </GoogleMapReact>
    </div>
  );
}

export default MapView;
