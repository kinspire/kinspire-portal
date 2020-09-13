import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import { getColor, View } from "../constants";
import { LinkPair } from "../util";

import "./GridSelection.css";

interface Props {
  items: LinkPair[];
  view?: View;
  colNum?: number;
}

// This component represents a generic "selection" screen that can show any list
// of items in a consistent fashion
// The `view` prop determines how items are shown, which is provided by the
// `contentService` (see contentService#getSelectionItems)
export default function Selection(props: Props) {
<<<<<<< HEAD:src/client/components/Selection.tsx
  const { items, view } = props;
  // var num = (12/this.props.colNum);
  const textStyle = view ? { color: getColor(view), fontSize: "100%", letterSpacing: "1px" } : undefined;
=======
  const { items, view, colNum } = props;
  // const num = 12 / colNum;
>>>>>>> b500f4becba51d109ae695338b09cd4a4c764fc6:src/client/components/GridSelection.tsx

  // sets the content style within the boxes
  const textStyle = view
    ? { color: getColor(view), fontSize: "30px", letterSpacing: "1px" }
    : undefined;
  return (
<<<<<<< HEAD:src/client/components/Selection.tsx
      <Grid container className="selection-categories" alignItems="center" justify="center">
        {items.map((item, i) => (
          <Grid item xs={6} className="selection-grid-item" key={i}>
            <Link key={item.link} className="selection-category" to={item.link}>
              <div className="selection-category-content">
                <div className="selection-category-text">
                  <Typography style={textStyle}>
                    <Box fontWeight="fontWeightBold">{item.title}</Box>
                  </Typography>
                  {item.subtitle ? (
                    <div className="selection-category-text-subtitle">
                      <i style={textStyle}>{item.subtitle}</i>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
=======
    <Grid container className="selection-categories" alignItems="center" justify="center">
      {items.map((item, i) => (
        <Grid item xs={6} className="selection-grid-item" key={i}>
          <Link key={item.link} className="selection-category" to={item.link}>
            <div className="selection-category-content">
              <div className="selection-category-text">
                <Typography style={textStyle}>
                  <Box fontWeight="fontWeightBold">{item.title}</Box>
                </Typography>
                {item.subtitle ? (
                  <div className="selection-category-text-subtitle">
                    <i style={textStyle}>{item.subtitle}</i>
                  </div>
                ) : (
                  ""
                )}
>>>>>>> b500f4becba51d109ae695338b09cd4a4c764fc6:src/client/components/GridSelection.tsx
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
  );
}
