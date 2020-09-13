<<<<<<< HEAD
import React from "react";
import { Link } from "react-router-dom";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { Grid, Typography } from "@material-ui/core";
=======
import { Box, Typography } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { Link } from "react-router-dom";
>>>>>>> b500f4becba51d109ae695338b09cd4a4c764fc6

import { getColor, View } from "../constants";
import { Tier } from "../util";

<<<<<<< HEAD
import "./Selection.css";

=======
>>>>>>> b500f4becba51d109ae695338b09cd4a4c764fc6
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
<<<<<<< HEAD
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
=======

  // sets the content style within the panels
  const textStyle = view
    ? {
        color: getColor(view),
        fontSize: "28px",
        letterSpacing: "1px",
      }
    : undefined;
  const linkStyle = view
    ? { color: getColor(view), fontSize: "24px", paddingLeft: "25px" }
    : undefined;

  return (
    <div style={{ width: "35%", margin: "auto" }}>
      {tiers.map((tier, i) => (
        <ExpansionPanel style={{ padding: "15px" }}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon style={{ color: getColor(view) }} />}
            aria-controls="expandable"
          >
            <Typography style={textStyle}>
              <Box fontWeight="fontWeightBold">{tier.title}</Box>
            </Typography>
            {tier.subtitle ? (
              <div>
>>>>>>> b500f4becba51d109ae695338b09cd4a4c764fc6
                <i style={textStyle}>{tier.subtitle}</i>
              </div>
            ) : (
              ""
            )}
          </ExpansionPanelSummary>
<<<<<<< HEAD
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
=======
          {tier.modules.map((module) => (
            <ExpansionPanelDetails>
              <Link style={linkStyle} to={`/module/${courseId}/${tier.id}/${module.id}`}>
                {module.title}
              </Link>

              {/* Provides a subtitle underneath the title if there is one */}
              {module.subtitle ? (
                <div>
                  <i style={textStyle}>{module.subtitle}</i>
                </div>
              ) : (
                ""
              )}
            </ExpansionPanelDetails>
          ))}
>>>>>>> b500f4becba51d109ae695338b09cd4a4c764fc6
        </ExpansionPanel>
      ))}
    </div>
  );
}
