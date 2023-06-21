import React, { useState, useEffect } from "react";
import MapView from "../components/MapView";
import { Typography, Grid } from "@mui/material";
import { getPOILocationList, getTripPlan, getCityInfo } from "../queries/query";

const tripPlanId = "64765c8a19c8de85ce9be342";

export default function TripPlanViewerPage() {
  const [tripPlan, setTripPlan] = useState(null);
  const [poiLocationList, setPoiLocationList] = useState(null);
  const [city, setCity] = useState("");
  const [mapCenter, setMapCenter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTripPlan(tripPlanId).then((data) => {
      if (data) {
        setTripPlan(data);
        setCity(data.city);
      }
    });
  }, []);

  useEffect(() => {
    if (tripPlan) {
      const body = { poi_id_list: tripPlan.poi_ids };
      getPOILocationList(body).then((data) => {
        if (data) {
          setPoiLocationList(data);
        }
      });
    }
  }, [tripPlan]);

  // Listening to the change in selectedCity
  useEffect(() => {
    if (!city) {
      return;
    }
    getCityInfo(city).then((data) => {
      if (data) {
        setMapCenter([Number(data.lat), Number(data.lon)]);
      }
    });
  }, [city]);

  useEffect(() => {
    if (mapCenter && poiLocationList) {
      setLoading(false);
    }
  }, [mapCenter, poiLocationList]);

  console.log(mapCenter, poiLocationList);

  return (
    <div>
      {/* <MapUpdate center={{ lat: 0, lon: 0 }} /> */}
      {loading ? (
        <div> loading</div>
      ) : (
        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            margin: 20,
          }}>
          <div style={{ width: "80%" }}>
            <MapView
              mapCenter={mapCenter}
              poiList={poiLocationList}
              mapHeight={50}
              zoom={12}
            />
            <br />
            <Typography variant="h4">Trip Plan</Typography>
            {poiLocationList.map(({ name }, index) => (
              <Typography variant="h6">
                {index + 1} - {name}
              </Typography>
            ))}
          </div>
        </Grid>
      )}
    </div>
  );
}
