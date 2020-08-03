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

// Creates a list of all the topics within a course
export default function Course() {

  // extracts the course id from the url
  const params = useParams<Params>();
  const course = courses.find((c) => {
      return c.id === params.id;
  })
  console.log(course);
  return (
    <Scaffold view={View.COURSE}>
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

        {/* Provides links to all the topics offered */}
        <ListSelection tiers={course.tiers} view={View.COURSES} courseId={course.id} />
      </div>
    </Scaffold>
  );
}
