import ReactFullpage from "@fullpage/react-fullpage";
import React from "react";

import { getColor, View } from "../constants";
import Header from "./Header";

import "./Scaffold.css";

interface Props {
  view: View;
}

// The main container for the Portal.
export default function Scaffold({ children, view }: React.PropsWithChildren<Props>) {
  // TODO propagate color up here, so the full page is colored
  return (
    <div className="portal-content">
      <Header />
      <ReactFullpage
        verticalCentered={false}
        render={() => {
          return (
            <ReactFullpage.Wrapper>
              <div className="section" style={{ backgroundColor: getColor(view) }}>
                {children}
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
}
