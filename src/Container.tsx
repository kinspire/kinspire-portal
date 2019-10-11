import * as React from "react";

import Header from "./components/Header";
// import Back from "./components/Back";

import "./Container.css";

interface Props {
  title: string;
}

// The main container for the Portal.
class Container extends React.Component<Props> {
  public render() {
    return (
      <div className="portal-content">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default Container;
