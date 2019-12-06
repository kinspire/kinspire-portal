import * as React from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Colors, ViewConstants } from "../constants";
import "./Selection.css";

interface Props {
  view: ViewConstants;
  items: Array<{ link: string; name: string }>;
}

// This component represents a generic "selection" screen that can show any list
// of items in a consistent fashion
// The `view` prop determines what items are shown, which is provided by the
// `contentService` (see contentService#getSelectionItems)
export default function Selection(props: Props) {
  const { view, items } = props;

  const style: React.CSSProperties = {
    backgroundColor: Colors[view],
  };

  // materials = #a9bb59;
  // activities = #79b4b3
  // if(view === ViewConstantsiewConstants.MATERIALS) {
  //   mainStyle.backgroundColor = '#a9bb59';
  //   mainStyle.margin = 0;
  //   mainStyle.padding = 0;
  // } else if(view === ViewConstantsiewConstants.ACTIViewConstantsITIES) {
  //   mainStyle.backgroundColor = '#79b4b3';
  // }

  return (
    <Container className="selection-categories-container" style={style}>
      <Row>
        <div className="selection-categories">
          {items.map(item => (
            <Link key={item.link} className="selection-category" to={item.link}>
              <div className="selection-category-content">
                <div className="selection-category-text">{item.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </Row>
    </Container>
  );
}
