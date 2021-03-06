import { callElectronContent } from "@app/services/electron";
import { LinkPair } from "@app/util";
import { ContentArg } from "@common/messages";
import { Course } from "@common/schema";
import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Selection from "../components/GridSelection";
import Scaffold from "../components/Scaffold";
import { View } from "../constants";
import "./Courses.css";

// Creates a grid of all the courses available to the account holder
export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const getCourses = async () => {
      setCourses((await callElectronContent(ContentArg.GET_COURSES)) as Course[]);
    };

    getCourses();
  }, []);

  return (
    <Scaffold view={View.COURSES}>
      <div className="courses-container">
        <Typography variant="h1">COURSES</Typography>

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
