import React, { useState, useEffect } from "react";
import MapView from "../components/MapView";
import { Typography, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { getPOILocationList, getTripPlan, getCityInfo } from "../queries/query";

// const tripPlanId = "64765c1d19c8de85ce9be341";

export default function TripPlanViewerPage() {
  const { tripPlanId } = useParams();
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
          spacing={10}
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            margin: 1,
          }}>
          <Grid item xs={8}>
            <MapView
              mapCenter={mapCenter}
              poiList={poiLocationList}
              mapHeight={80}
              zoom={13}
            />
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h4">Trip Plan</Typography>
            {poiLocationList.map(({ name }, index) => (
              <Typography variant="h6">
                {index + 1} - {name}
              </Typography>
            ))}
          </Grid>
        </Grid>
      )}
    </div>
  );
}
