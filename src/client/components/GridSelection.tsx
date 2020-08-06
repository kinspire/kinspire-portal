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
  const { items, view, colNum } = props;
  // const num = 12 / colNum;

  // sets the content style within the boxes
  const textStyle = view
    ? { color: getColor(view), fontSize: "30px", letterSpacing: "1px" }
    : undefined;
  return (
    <Grid container className="selection-categories" alignItems="center" justify="center">
      {items.map((item, i) => (
        <Grid item xs={6} className="selection-grid-item" key={i}>
          <Link key={item.link} className="selection-category" to={item.link}>
            <div className="selection-category-content">
              <div className="selection-category-text">
                <Typography style={{ fontWeight: "bold", ...textStyle }}>{item.title}</Typography>
                {item.subtitle ? (
                  <div className="selection-category-text-subtitle">
                    <i style={textStyle}>{item.subtitle}</i>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
