/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import PlaceCard from "./PlaceCard";

const PAGE_SIZE = 15;

export default function PlacesList({ poiList, onSelectedPoiListChange }) {
  const [isSelectedList, setIsSelectedList] = useState(null);

  useEffect(() => {
    if (!poiList) {
      return;
    }
    setIsSelectedList(Array(poiList.length).fill(false));
  }, [poiList]);

  useEffect(() => {
    if (!isSelectedList) {
      return;
    }
    onSelectedPoiListChange(isSelectedList);
  }, [isSelectedList]);

  const selectPartnerLocation = (idx) => {
    const tmpArray = [...isSelectedList];
    tmpArray[idx] = true;
    setIsSelectedList(tmpArray);
  };

  const deselectPartnerLocation = (idx) => {
    const tmpArray = [...isSelectedList];
    tmpArray[idx] = false;
    setIsSelectedList(tmpArray);
  };

  const isSelected = (idx) => {
    if (!isSelectedList) {
      return false;
    }
    return isSelectedList[idx];
  };

  return (
    <Grid>
      {poiList?.map((poi, idx) => (
        <PlaceCard
          poi={poi}
          index={idx}
          cardSelected={isSelected(idx)}
          onPlaceCardSelect={selectPartnerLocation}
          onPlaceCardDeselect={deselectPartnerLocation}
        />
      ))}
    </Grid>
  );
}
