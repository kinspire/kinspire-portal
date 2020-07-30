import React from "react";

import Scaffold from "../components/Scaffold";
import ListSelection from "../components/ListSelection";
import { View } from "../constants";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { courses } from "../Sample";

import "./Curricula.css";

interface Params {
    id: string;
}

export default function Course() {
  const params = useParams<Params>();
  const course = courses.find((c) => {
      return c.id === params.id;
  })
  console.log(course);
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
          {course.title}
        </Typography>
        <ListSelection tiers={course.tiers} view={View.MATERIALS} courseId={course.id} />
      </div>
    </Scaffold>
  );
}
