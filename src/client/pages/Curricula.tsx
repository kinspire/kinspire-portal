import React from "react";

import Scaffold from "../components/Scaffold";
import Selection from "../components/Selection";
import { View } from "../constants";
import { Typography } from "@material-ui/core";

import "./Curricula.css";

const curricula = [
  { name: "English Curriculum", link: "/stories" },
  { name: "Leadership Curriculum", link: "/curricula" },
  { name: "Health Curriculum", link: "/curricula" },
  { name: "Financial Curriculum", link: "/curricula" },
  //   { name: "Financial Curriculum", link: "/curricula" },
];
export default function Curricula() {
  return (
    <Scaffold view={View.MATERIALS}>
      <div className="curricula-container">
        <Typography
          style={{ textAlign: "center", color: "white", fontWeight: "normal", fontSize: "65px", paddingBottom: "3%" }}
        >
          CURRICULA
        </Typography>
        <Selection items={curricula} view={View.MATERIALS} colNum={2} />
      </div>
    </Scaffold>
  );
}
