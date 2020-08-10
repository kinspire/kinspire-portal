import React, { useEffect, useState } from "react";

import { Button, Typography } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import ListSelection from "../components/ListSelection";
import Scaffold from "../components/Scaffold";
import { getColor, View } from "../constants";
import { courses } from "../../common/Sample";

import { callElectron } from "@app/services/content";
import { ContentArg } from "@common/messages";
import { Course } from "@common/schema";
import "./Courses.css";

interface Params {
  id: string;
}

// Creates a list of all the topics within a course
export default function Course() {
  // extracts the course id from the url
  const params = useParams<Params>();

  const [course, setCourse] = useState<Course>(null);

  useEffect(() => {
    const getCourse = async () => {
      setCourse(await callElectron(ContentArg.GET_COURSE, { courseId: params.id }));
    };

    getCourse();
  }, []);

  // const course = courses.find((c) => {
  //   return c.id === params.id;
  // });
  // console.log(course);
  return (
    <Scaffold view={View.COURSE}>
      <div className="courses-container">
        {course && (
          <>
            <Typography variant="h2" style={{ color: getColor(View.COURSES) }}>
              {course.title.toUpperCase()}
            </Typography>

            {/* Provides links to all the topics offered */}
            <ListSelection tiers={course.tiers} view={View.COURSES} courseId={course.id} />
          </>
        )}
        <Button style={{ backgroundColor: getColor(View.COURSES) }}>
          <Link to="/courses">BACK</Link>
        </Button>
      </div>
    </Scaffold>
  );
}
