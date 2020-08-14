import { callElectron } from "@app/services/content";
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
  tier: string;
  module: string;
}

// Creates a grid of all the sub-topics within a topic
export default function Module() {
  // extracts the topic id from the url
  const params = useParams<Params>();

  const [course, setCourse] = useState<Course>(null);
  useEffect(() => {
    const getCourse = async () => {
      setCourse(await callElectron(ContentArg.GET_COURSE, { courseId: params.course }));
    };

    getCourse();
  }, []);

  const tier = find(get(course, "tiers"), (t) => {
    return t.id === params.tier;
  });
  const module = find(get(tier, "modules"), (m) => {
    return m.id === params.module;
  });
  return (
    <Scaffold view={View.COURSE}>
      <div className="courses-container">
        {module && (
          <>
            <Typography variant="h3" style={{ color: "white" }}>
              {module.title.toUpperCase()}
            </Typography>

            {/* Provides links to all the sub-topics offered */}
            <Selection
              items={module.lessons.map((l) => {
                return {
                  title: l.title,
                  link: `/lesson/${course.id}/${tier.id}/${module.id}/${l.id}`,
                } as LinkPair;
              })}
              view={View.COURSES}
            />
          </>
        )}
        <Button style={{ backgroundColor: getColor(View.COURSES) }}>
          <Link to="/home">BACK</Link>
        </Button>
      </div>
    </Scaffold>
  );
}
