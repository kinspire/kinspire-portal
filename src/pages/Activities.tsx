import React from "react";

import Scaffold from "../components/Scaffold";
import Selection from "../components/Selection";
import { View } from "../constants";

const activities = [
  // { name: "Word Searches", link: "/activities/wordsearch" },
  { name: "Stories", link: "/activities/stories" },
];

export default function Activities() {
  return (
    <Scaffold view={View.ACTIVITIES}>
      <Selection items={activities} />
    </Scaffold>
  );
}
