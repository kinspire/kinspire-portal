import { callElectronContent } from "@app/services/electron";
import { ContentArg } from "@common/messages";
import { Course } from "@common/schema";
import { Button, Typography } from "@material-ui/core";
import { find, get, map } from "lodash";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getColor, View } from "../constants";

interface Params {
  course: string;
  section: string;
  module: string;
}

export default function SubmitPage() {
  const params = useParams<Params>();

  const [course, setCourse] = useState<Course>(null);
  useEffect(() => {
    const getCourse = async () => {
      setCourse(await callElectronContent(ContentArg.GET_COURSE, { courseId: params.course }));
    };

    getCourse();
  }, []);
  const section = find(get(course, "sections"), (t) => {
    return t.id === params.section;
  });
  const module = find(get(section, "modules"), (m) => {
    return m.id === params.module;
  });

  return (
    <div style={{ height: "calc(100vh - 310px)" }}>
      <Typography
        variant="h5"
        style={{
          color: getColor(View.COURSES),
          margin: "150px auto",
          width: "50%",
          textAlign: "center",
        }}
      >
        All your responses for {get(module, "title")} have been submitted! Graded feedback will be
        availabe to view in a few days.
      </Typography>
      <Button
        style={{
          backgroundColor: getColor(View.COURSES),
          width: "300px",
          margin: "100px",
        }}
      >
        <Link style={{ color: "white" }} to="/courses">
          BACK TO CLASSES
        </Link>
        {/* <Link style={{ color: "white" }} to="">
          NEXT LESSON
        </Link> */}
      </Button>
    </div>
  );
}
