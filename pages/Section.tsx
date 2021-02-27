import { callElectronContent } from "../services/electron";
import { LinkPair } from "../util";
import { ContentArg } from "@common/messages";
import { Course } from "@common/schema";
import { Button, Text } from "@material-ui/core";
import { find, get } from "lodash";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-native";
import Selection from "../components/GridSelection";
import Scaffold from "../components/Scaffold";
import { getColor, PageView } from "../constants";
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
    <Scaffold view={PageView.COURSE}>
      <View className="courses-container">
        {section && (
          <>
            <Text variant="h3" style={{ color: "white" }}>
              {section.title.toUpperCase()}
            </Text>

            {/* Provides links to all the sub-topics offered */}
            <Selection
              items={section.modules.map((m) => {
                return {
                  title: m.title,
                  link: `/module/${course.id}/${section.id}/${m.id}`,
                } as LinkPair;
              })}
              view={PageView.COURSES}
            />
          </>
        )}
        <Button style={{ backgroundColor: getColor(PageView.COURSES) }}>
          <Link to={`/course/${params.course}`}>BACK</Link>
        </Button>
      </View>
    </Scaffold>
  );
}
