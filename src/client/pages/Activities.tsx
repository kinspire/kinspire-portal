import React from "react";

import Scaffold from "../components/Scaffold";
import Selection from "../components/Selection";
import { View } from "../constants";

const activities = [
  // { name: "Word Searches", link: "/wordsearch" },
  { name: "Stories", link: "/stories" },
];

export default function Activities() {
  const view = View.ACTIVITIES;
  return (
    <Scaffold view={view}>
      <Selection view={view} items={activities} />
    </Scaffold>
  );
}
