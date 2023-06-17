import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import PlaceIcon from "@mui/icons-material/Place";
import { getCityInfo } from "../queries/query";
const googleMapCredentials = require("../credentials/google_credentials.json");

function MapView({ mapCenter, poiList }) {
  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <GoogleMapReact
        options={{ gestureHandling: "none", disableDefaultUI: true }}
        bootstrapURLKeys={{ key: googleMapCredentials.mapApiKey }}
        defaultCenter={mapCenter}
        defaultZoom={12}>
        {poiList.map((googleLocationInfo) => {
          if (googleLocationInfo) {
            return (
              <PlaceIcon
                key={googleLocationInfo.google_place_id}
                fontSize="large"
                sx={{ color: "#f44336" }}
                lat={googleLocationInfo.lat}
                lng={googleLocationInfo.lon}
              />
            );
          }

          return [];
        })}
      </GoogleMapReact>
    </div>
  );
}

export default MapView;
