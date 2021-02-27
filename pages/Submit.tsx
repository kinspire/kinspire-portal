import { callElectronContent } from "../services/electron";
import { ContentArg } from "@common/messages";
import { Course } from "@common/schema";
import { Button, Text } from "@material-ui/core";
import { find, get, map } from "lodash";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-native";
import { getColor, PageView } from "../constants";

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
    <View style={{ height: "calc(100vh - 310px)" }}>
      <Text
        variant="h5"
        style={{
          color: getColor(PageView.COURSES),
          margin: "150px auto",
          width: "50%",
          textAlign: "center",
        }}
      >
        All your responses for {get(module, "title")} have been submitted! Graded feedback will be
        availabe to view in a few days.
      </Text>
      <Button
        style={{
          backgroundColor: getColor(PageView.COURSES),
          width: "300px",
          margin: "100px",
        }}
      >
        <Link style={{ color: "white" }} to={`/section/${course}/${section}`}>
          BACK TO SECTION
        </Link>
        {/* <Link style={{ color: "white" }} to="">
          NEXT LESSON
        </Link> */}
      </Button>
    </View>
  );
}
