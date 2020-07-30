import React from "react";
import { Link } from "react-router-dom";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { Grid, Typography } from "@material-ui/core";

import { getColor, View } from "../constants";
import { Tier } from "../util";

import "./Selection.css";

interface Props {
  tiers: Tier[];
  view?: View;
  courseId: string;
}

// This component represents a generic "list selection" screen that can show any list
// of items in a consistent fashion
// The `view` prop determines how items are shown, which is provided by the
// `contentService` (see contentService#getSelectionItems)
export default function ListSelection(props: Props) {
  const { tiers, view, courseId } = props;
  // var num = (12/this.props.colNum);
  // how is the items prop structured: two tiers (general and then modules)
  const textStyle = view
    ? { color: getColor(view), fontSize: "100%", letterSpacing: "1px" }
    : undefined;

  return (
    <div style={{ width: "30%", margin: "auto" }}>
      {tiers.map((tier, i) => (
        <ExpansionPanel>
          <ExpansionPanelSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography style={textStyle}>{tier.title}</Typography>
            {tier.subtitle ? (
              <div className="selection-category-text-subtitle">
                <i style={textStyle}>{tier.subtitle}</i>
              </div>
            ) : (
              ""
            )}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {tier.modules.map((module, i) => (
              <div>
                <Link to={`/module/${courseId}/${tier.id}/${module.id}`}>{module.title}</Link>
                {module.subtitle ? (
                  <div className="selection-category-text-subtitle">
                    <i style={textStyle}>{module.subtitle}</i>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
}
