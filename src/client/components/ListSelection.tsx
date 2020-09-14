import { Box, Typography } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { Link } from "react-router-dom";

import { getColor, View } from "../constants";
import { Section } from "@common/schema";

interface Props {
  tiers: Section[];
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
        <Accordion style={{ padding: "15px" }} key={i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: getColor(view) }} />}
            aria-controls="expandable"
          >
            <Typography style={{ fontWeight: "bold", ...textStyle }}>{tier.title}</Typography>
            {tier.subtitle ? <i style={textStyle}>{tier.subtitle}</i> : ""}
          </AccordionSummary>
          {tier.modules.map((module: any, j) => (
            <AccordionDetails key={j}>
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
            </AccordionDetails>
          ))}
        </Accordion>
      ))}
    </div>
  );
}
