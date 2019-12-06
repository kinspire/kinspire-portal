import * as React from "react";

import Selection from "../components/Selection";
import { ViewConstants as V } from "../constants";

const activities = [
  { name: "Word Searches", link: "/activities/wordsearch" },
  { name: "Stories", link: "/activities/stories" },
];
export default function Activities() {
  return <Selection view={V.ACTIVITIES} items={activities} />;
}
