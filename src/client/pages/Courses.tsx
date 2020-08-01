import React from "react";

import Scaffold from "../components/Scaffold";
import Selection from "../components/Selection";
import { View } from "../constants";
import { Typography } from "@material-ui/core";
import { courses } from "../Sample";

import "./Curricula.css";
import { LinkPair } from "@app/util";

// Creates a grid of all the courses available to the account holder
export default function Courses() {
  return (
    <Scaffold view={View.COURSES}>
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

        {/* Links to all the various courses offered */}
        <Selection
          items={courses.map((c) => {
            return {
              title: c.title,
              link: "/course/" + c.id,
            } as LinkPair
          })}
          view={View.COURSES}
        />
      </div>
    </Scaffold>
  );
}
