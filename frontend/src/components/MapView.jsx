import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import PlaceIcon from "@mui/icons-material/Place";
import { Grid, Typography } from "@mui/material";
import { fontWeight } from "@mui/system";
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
          name: item.name,
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
        options={{
          gestureHandling: "none",
          disableDefaultUI: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        }}
        bootstrapURLKeys={{ key: googleMapCredentials.mapApiKey }}
        defaultCenter={mapCenter}
        defaultZoom={zoom}>
        {mapList?.map((googleLocationInfo, index) => (
          <div
            key={googleLocationInfo.google_place_id}
            lat={googleLocationInfo.lat}
            lng={googleLocationInfo.lon}
            style={{
              display: "flex",
              justifyContent: "center",
              width: "80px",
            }}>
            <Grid container>
              <Grid item xs={12}>
                <PlaceIcon fontSize="small" sx={{ color: "#f44336" }} />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  style={{
                    color: "black",
                    opacity: 1.0,
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}>
                  {index + 1} - {googleLocationInfo.name}
                </Typography>
              </Grid>
            </Grid>
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
}

export default MapView;
