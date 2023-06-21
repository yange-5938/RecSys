import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Avatar, CardActionArea } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";

export default function PlaceCard({
  poi,
  index,
  cardSelected,
  onPlaceCardSelect,
  onPlaceCardDeselect,
}) {
  const handleCardSelection = () => {
    if (cardSelected) {
      // Was selected, now de-selecting
      onPlaceCardDeselect(index);
    } else {
      // Was "not" selected, now selecting
      onPlaceCardSelect(index);
    }
  };

  return (
    <Card
      sx={{ width: "%100", height: "10vh", m: 1 }}
      style={{ backgroundColor: cardSelected ? "#c5e1a5" : "" }}>
      <CardActionArea onClick={handleCardSelection}>
        {poi ? (
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "10vh",
                }}>
                {poi.locationPicture ? (
                  <Avatar
                    sx={{
                      width: "75px",
                      height: "75px",
                    }}
                    src={poi.locationPicture}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: "75px",
                      height: "75px",
                    }}>
                    <MapIcon sx={{ width: "50%", height: "50%" }} />
                  </Avatar>
                )}
              </div>
            </Grid>

            <Grid item xs={9}>
              <CardContent>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",

                    height: "8vh",
                  }}>
                  <Typography gutterBottom variant="h6" color="text.primary">
                    {poi.name}
                  </Typography>
                </div>
              </CardContent>
            </Grid>
          </Grid>
        ) : (
          []
        )}
      </CardActionArea>
    </Card>
  );
}
