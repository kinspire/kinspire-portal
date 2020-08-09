import React from "react";

import { Typography, Link, Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import ListSelection from "../components/ListSelection";
import Scaffold from "../components/Scaffold";
import { View, getColor } from "../constants";
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
  });
  return (
    <Scaffold view={View.COURSE}>
      <div className="curricula-container">
        <Typography variant="h2">{course.title.toUpperCase()}</Typography>

        {/* Provides links to all the topics offered */}
        <ListSelection tiers={course.tiers} view={View.COURSES} courseId={course.id} />
        <Button style={{ backgroundColor: getColor(View.COURSES) }}>
          <Link href="/curricula">BACK</Link>
        </Button>
      </div>
    </Scaffold>
  );
}
