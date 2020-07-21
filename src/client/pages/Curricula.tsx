import React from "react";

import Scaffold from "../components/Scaffold";
import Selection from "../components/Selection";
import { View } from "../constants";

const curricula = [
  { name: "English Curriculum", link: "/stories" },
  { name: "Leadership Curriculum", link: "/curricula" },
  { name: "Health Curriculum", link: "/curricula" },
  //   { name: "Financial Curriculum", link: "/curricula" },
];
export default function Curricula() {
  return (
    <Scaffold view={View.MATERIALS}>
      <Selection items={curricula} view={View.MATERIALS} title={"STORIES"} />
    </Scaffold>
  );
}
