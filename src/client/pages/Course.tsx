import React, { useEffect, useState } from "react";

import { Button, Typography } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import GridSelection from "../components/GridSelection";
import Scaffold from "../components/Scaffold";
import { getColor, View } from "../constants";

import { callElectron } from "@app/services/content";
import { LinkPair } from "@app/util";
import { ContentArg } from "@common/messages";
import { Course } from "@common/schema";
import "./Courses.css";

interface Params {
  course: string;
}

// Creates a list of all the topics within a course
export default function Course() {
  const params = useParams<Params>();

  const [course, setCourse] = useState<Course>(null);

  useEffect(() => {
    const getCourse = async () => {
      setCourse(await callElectron(ContentArg.GET_COURSE, { courseId: params.course }));
    };

    getCourse();
  }, []);

  return (
    <Scaffold view={View.COURSE}>
      <div className="courses-container">
        {course && (
          <>
            <Typography variant="h2" style={{ color: getColor(View.COURSES) }}>
              {course.title.toUpperCase()}
            </Typography>

            {/* Provides links to all the topics offered */}
            <GridSelection
              items={course.sections.map((s) => {
                return {
                  title: s.title,
                  link: `/section/${params.course}/${s.id}`,
                } as LinkPair;
              })}
              view={View.COURSE}
            />
          </>
        )}
        <Button style={{ backgroundColor: getColor(View.COURSES) }}>
          <Link to="/courses">BACK</Link>
        </Button>
      </div>
    </Scaffold>
  );
}
