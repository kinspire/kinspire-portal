import React from "react";
import { Link } from "react-router-dom";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { Grid, Typography } from "@material-ui/core";

import { getColor, View } from "../constants";
import { LinkPair } from "../util";

import "./Selection.css";

interface Props {
  items: LinkPair[];
  view?: View;
}

// This component represents a generic "list selection" screen that can show any list
// of items in a consistent fashion
// The `view` prop determines how items are shown, which is provided by the
// `contentService` (see contentService#getSelectionItems)
export default function ListSelection(props: Props) {
  const { items, view } = props;
  // var num = (12/this.props.colNum);
  const textStyle = view
    ? { color: getColor(view), fontSize: "100%", letterSpacing: "1px" }
    : undefined;

  return (
    <div style={{ width: "30%", margin: "auto" }}>
      {items.map((item, i) => (
        <ExpansionPanel>
          <ExpansionPanelSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography style={textStyle}>{item.name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Link to={item.link}>{item.name}</Link>
            {item.subtitle ? (
              <div className="selection-category-text-subtitle">
                <i style={textStyle}>{item.subtitle}</i>
              </div>
            ) : (
              ""
            )}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
}
