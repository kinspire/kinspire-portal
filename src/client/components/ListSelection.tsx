import React from "react";
import { Link } from "react-router-dom";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { Box, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { getColor, View } from "../constants";
import { Tier } from "../util";

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
                <i style={textStyle}>{tier.subtitle}</i>
              </div>
            ) : (
              ""
            )}
          </ExpansionPanelSummary>
          {tier.modules.map((module, i) => (
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
        </ExpansionPanel>
      ))}
    </div>
  );
}
