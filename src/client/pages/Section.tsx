import { callElectronContent } from "@app/services/electron";
import { LinkPair } from "@app/util";
import { ContentArg } from "@common/messages";
import { Course } from "@common/schema";
import { Button, Typography } from "@material-ui/core";
import { find, get } from "lodash";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Selection from "../components/GridSelection";
import Scaffold from "../components/Scaffold";
import { getColor, View } from "../constants";
import "./Courses.css";

interface Params {
  course: string;
  section: string;
}

// Creates a grid of all the sub-topics within a topic
export default function Section() {
  // extracts the topic id from the url
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
  return (
    <Scaffold view={View.COURSE}>
      <div className="courses-container">
        {section && (
          <>
            <Typography variant="h3" style={{ color: "white" }}>
              {section.title.toUpperCase()}
            </Typography>

            {/* Provides links to all the sub-topics offered */}
            <Selection
              items={section.modules.map((m) => {
                return {
                  title: m.title,
                  link: `/module/${course.id}/${section.id}/${m.id}`,
                } as LinkPair;
              })}
              view={View.COURSES}
            />
          </>
        )}
        <Button style={{ backgroundColor: getColor(View.COURSES) }}>
          <Link to={`/course/${params.course}`}>BACK</Link>
        </Button>
      </div>
    </Scaffold>
  );
}
