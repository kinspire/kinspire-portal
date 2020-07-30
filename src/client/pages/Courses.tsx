import React from "react";

import Scaffold from "../components/Scaffold";
import Selection from "../components/Selection";
import { View } from "../constants";
import { Typography } from "@material-ui/core";
import { courses } from "../Sample";

import "./Curricula.css";
import { LinkPair } from "@app/util";

// should be passed in programmatically and display the content dynamically
// const curricula = [
//   { name: "English", link: "/stories" },
//   { name: "Leadership", link: "/curricula" },
//   { name: "Health", link: "/curricula" },
//   { name: "Financial", link: "/curricula" },
// ];

export default function Curricula() {
  return (
    <Scaffold view={View.MATERIALS}>
      <div className="curricula-container">
        <Typography
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "normal",
            fontSize: "65px",
            paddingBottom: "3%",
          }}
        >
          Curricula
        </Typography>
        <Selection
          items={courses.map((c) => {
            return {
              title: c.title,
              link: "/course/" + c.id,
            } as LinkPair
          })}
          view={View.MATERIALS}
        />
      </div>
    </Scaffold>
  );
}
