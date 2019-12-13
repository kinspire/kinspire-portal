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
      <main className="portal-background" style={{ backgroundColor: getColor(view) }}>
        <Header />
        {children}
      </main>
    </div>
  );
}
