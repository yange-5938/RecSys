import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MapView from "../components/MapView";
import {
  getPoiListByCity,
  getCityInfo,
  createTripPlan,
} from "../queries/query";
import { Typography, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import PlacesList from "../components/PlacesList";
import { Button } from "@mui/material";

export default function TripPlanningPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [city, setCity] = useState(null);
  const [userId, setUserId] = useState("647606e7e3500e43856c4231"); // TODO: this should be given as parameter.
  const [createdTripPlanId, setCreatedTripPlanId] = useState(null);
  const [poiList, setPoiList] = useState(null);
  const [mapViewPoiList, setMapViewPoiList] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSelectionChange = (isSelectedList) => {
    setMapViewPoiList(poiList.filter((_, index) => isSelectedList[index]));
  };

  const onComplete = () => {
    createTripPlan(userId, {
      poi_id_list: mapViewPoiList.map((obj) => String(obj._id)),
    }).then((response) => {
      setCreatedTripPlanId(response.data.tripPlanId);
    });
  };

  useEffect(() => {
    if (!createdTripPlanId) {
      return;
    }
    navigate(`/trip-plan-view-page/${createdTripPlanId}`);
  }, [createdTripPlanId]);

  useEffect(() => {
    setCity(location.state.city);
    setPoiList(location.state.recommendedPoiList);
  }, []);

  // useEffect(() => {
  //   if (!city) {
  //     return;
  //   }
  //   getPoiListByCity(city).then((data) => {
  //     if (data) {
  //       setPoiList(data);
  //     }
  //   });
  // }, [city]);

  useEffect(() => {
    if (!city) {
      return;
    }
    getCityInfo(city).then((data) => {
      if (data) {
        setMapCenter({ lat: data.lat, lng: data.lon });
        setLoading(false);
      }
    });
  }, [city]);

  console.log(city, poiList);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        marginTop: 50,
      }}>
      <Grid
        container
        style={{
          display: "flex",
          width: "100%",
          margin: 20,
        }}>
        <Grid item xs={5}>
          <Grid container>
            <Grid item xs={12}>
              {loading ? (
                <div> loading</div>
              ) : (
                <div style={{ width: "100%" }}>
                  <MapView
                    mapCenter={mapCenter}
                    poiList={mapViewPoiList}
                    mapHeight={50}
                    zoom={11}
                  />
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              {mapViewPoiList.length > 0 ? (
                <Paper style={{ maxHeight: "38vh", overflow: "auto" }}>
                  <Typography variant="h4">Selected Places</Typography>

                  {mapViewPoiList.map(({ name }, index) => (
                    <Typography variant="h6">
                      {index + 1} - {name}
                    </Typography>
                  ))}
                </Paper>
              ) : (
                <div />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <Paper style={{ maxHeight: "80vh", overflow: "auto" }}>
            <PlacesList
              poiList={poiList}
              onSelectedPoiListChange={handleSelectionChange}
            />
          </Paper>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: 20,
            }}>
            <Button onClick={onComplete}>Complete</Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
