import { Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import { getColor, View } from "../constants";
import { LinkPair } from "../util";

import "./Selection.css";

interface Props {
  items: LinkPair[];
  view?: View;
}

// This component represents a generic "selection" screen that can show any list
// of items in a consistent fashion
// The `view` prop determines what items are shown, which is provided by the
// `contentService` (see contentService#getSelectionItems)
export default function Selection(props: Props) {
  const { items, view } = props;

  // materials = #a9bb59;
  // activities = #79b4b3
  // if(view === ViewConstantsiewConstants.MATERIALS) {
  //   mainStyle.backgroundColor = '#a9bb59';
  //   mainStyle.margin = 0;
  //   mainStyle.padding = 0;
  // } else if(view === ViewConstantsiewConstants.ACTIViewConstantsITIES) {
  //   mainStyle.backgroundColor = '#79b4b3';
  // }

  const textStyle = view ? { color: getColor(view) } : undefined;

  return (
    <Grid container className="selection-categories" alignItems="center" justify="center">
      {items.map(item => (
        <Grid item xs={3}>
          <Link key={item.link} className="selection-category" to={item.link}>
            <div className="selection-category-content">
              <div className="selection-category-text">
                <div style={textStyle}>{item.name}</div>
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
