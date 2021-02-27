import React from "react";

import Scaffold from "../components/Scaffold";
import Selection from "../components/GridSelection";
import { PageView } from "../constants";

const activities = [{ title: "Word Searches", link: "/wordsearches" }];
export default function Activities() {
  return (
    <Scaffold view={PageView.ACTIVITIES}>
      <Selection items={activities} view={PageView.ACTIVITIES} colNum={2} />
    </Scaffold>
  );
}
