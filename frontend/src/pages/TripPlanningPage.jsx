import React, { useState, useEffect } from "react";
import MapView from "../components/MapView";
import { getPoiListByCity, getCityInfo } from "../queries/query";
import { Typography, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import PlacesList from "../components/PlacesList";

export default function TripPlanningPage() {
  const [city, setCity] = useState("istanbul"); // TODO: this should be given as parameter.
  const [poiList, setPoiList] = useState(null);
  const [mapViewPoiList, setMapViewPoiList] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSelectionChange = (isSelectedList) => {
    setMapViewPoiList(poiList.filter((_, index) => isSelectedList[index]));
  };

  useEffect(() => {
    if (!city) {
      return;
    }
    getPoiListByCity(city).then((data) => {
      if (data) {
        setPoiList(data);
      }
    });
  }, [city]);

  console.log(mapViewPoiList);

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

  return (
    <div>
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
                    zoom={10}
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
          <Paper style={{ maxHeight: "90vh", overflow: "auto" }}>
            <PlacesList
              poiList={poiList}
              onSelectedPoiListChange={handleSelectionChange}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
