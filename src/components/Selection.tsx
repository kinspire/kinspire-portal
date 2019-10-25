import * as React from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Colors, ViewConstants } from "../constants";
import { getSelectionItems } from "../services/contentService";
import "./Selection.css";

interface Props {
  view: ViewConstants;
}

interface State {
  items: any[];
}

// This component represents a generic "selection" screen that can show any list
// of items in a consistent fashion
// The `view` prop determines what items are shown, which is provided by the
// `contentService` (see contentService#getSelectionItems)
class Selection extends React.Component<Props, State> {
  public state: State = {
    items: [],
  };

  public async componentDidMount() {
    this.setState({
      items: await getSelectionItems(
        this.props.view
        // JSON.parse(localStorage.getItem("user") || "")
      ),
    });
  }

  public render() {
    const style: React.CSSProperties = {
      backgroundColor: Colors[this.props.view],
    };

    const itemsRendered = this.state.items.map(item => (
      <Link key={item.link} className="selection-category" to={item.link}>
        <div className="selection-category-content">
          <div className="selection-category-text">{item.name}</div>
        </div>
      </Link>
    ));

    // materials = #a9bb59;
    // activities = #79b4b3
    // if(this.props.view === ViewConstantsiewConstants.MATERIALS) {
    //   mainStyle.backgroundColor = '#a9bb59';
    //   mainStyle.margin = 0;
    //   mainStyle.padding = 0;
    // } else if(this.props.view === ViewConstantsiewConstants.ACTIViewConstantsITIES) {
    //   mainStyle.backgroundColor = '#79b4b3';
    // }

    return (
      <Container className="selection-categories-container" style={style}>
        <Row>
          <div className="selection-categories">{itemsRendered}</div>
        </Row>
      </Container>
    );
  }
}

export default Selection;
