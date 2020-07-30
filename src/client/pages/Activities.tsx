import React from "react";

import Scaffold from "../components/Scaffold";
import Selection from "../components/Selection";
import { View } from "../constants";

const activities = [
  { title: "Word Searches", link: "/wordsearches" },
];
export default function Activities() {
  return (
    <Scaffold view={View.ACTIVITIES}>
      <Selection items={activities} view={View.ACTIVITIES} colNum={2}/>
    </Scaffold>
  );
}
