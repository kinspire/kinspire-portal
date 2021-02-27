import React, { useEffect, useState } from "react";

import { Button, Text } from "@material-ui/core";
import { Link, useParams } from "react-router-native";
import GridSelection from "../components/GridSelection";
import Scaffold from "../components/Scaffold";
import { getColor, PageView } from "../constants";

import { callElectronContent } from "../services/electron";
import { LinkPair } from "../util";
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
      setCourse(await callElectronContent(ContentArg.GET_COURSE, { courseId: params.course }));
    };

    getCourse();
  }, []);

  return (
    <Scaffold view={PageView.COURSE}>
      <View className="courses-container">
        {course && (
          <>
            <Text variant="h2" style={{ color: getColor(PageView.COURSES) }}>
              {course.title.toUpperCase()}
            </Text>

            {/* Provides links to all the topics offered */}
            <GridSelection
              items={course.sections.map((s) => {
                return {
                  title: s.title,
                  link: `/section/${params.course}/${s.id}`,
                } as LinkPair;
              })}
              view={PageView.COURSE}
            />
          </>
        )}
        <Button style={{ backgroundColor: getColor(PageView.COURSES) }}>
          <Link to="/courses">BACK</Link>
        </Button>
      </View>
    </Scaffold>
  );
}
