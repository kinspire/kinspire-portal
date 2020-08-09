import React from "react";

import { Typography } from "@material-ui/core";
import Selection from "../components/GridSelection";
import Scaffold from "../components/Scaffold";
import { View } from "../constants";
import { courses } from "../Sample";

import { LinkPair } from "@app/util";
import "./Curricula.css";

// Creates a grid of all the courses available to the account holder
export default function Courses() {
  const title = "COURSES";
  return (
    <Scaffold view={View.COURSES}>
      <div className="curricula-container">
        <Typography variant="h1">{title.toUpperCase()}</Typography>

        {/* Links to all the various courses offered */}
        <Selection
          items={courses.map((c) => {
            return {
              title: c.title,
              link: "/course/" + c.id,
            } as LinkPair;
          })}
          view={View.COURSES}
          colNum={2}
        />
      </div>
    </Scaffold>
  );
}
