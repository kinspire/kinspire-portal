import { callElectron } from "@app/services/content";
import { LinkPair } from "@app/util";
import { ContentArg } from "@common/messages";
import { Course } from "@common/schema";
import { Typography } from "@material-ui/core";
import { find, get } from "lodash";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Selection from "../components/GridSelection";
import Scaffold from "../components/Scaffold";
import { View } from "../constants";
import "./Curricula.css";

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
      <div className="curricula-container">
        {module && (
          <>
            <Typography
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "normal",
                fontSize: "65px",
                paddingBottom: "3%",
              }}
            >
              {module.title}
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
      </div>
    </Scaffold>
  );
}
