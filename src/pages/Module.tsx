import { find, get } from "lodash";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useParams } from "react-router";
import { Link } from "react-router-native";
import { StoryContent } from "../schema";
import { Moodle } from "../services/moodle";
import { useSelector } from "../store";

export default function ModulePage() {
  const courses = useSelector((state) => state.contentState.courses);
  const allSections = useSelector((state) => state.contentState.sections);

  const { courseId, sectionId, moduleId } = useParams<{
    courseId: string;
    sectionId: string;
    moduleId: string;
  }>();

  const [story, setStory] = useState("");

  useEffect(() => {
    const getModule = async () => {
      const module = await Moodle.getModule(courseId, sectionId, moduleId);
      setStory(get(module, "content.story", ""));
    };

    getModule();
  }, []);

  const course = find(courses, (c) => c.id === courseId);
  const section = find(get(allSections, courseId), (s) => s.id === sectionId);
  const module = find(get(section, "modules"), (m) => m.id === moduleId);

  return (
    <View>
      <Text>Course: {get(course, "title")}</Text>
      <Text>Section: {get(section, "title")}</Text>
      <Text>Module: {get(module, "title")}</Text>
      <Text>{story}</Text>
    </View>
  );
}
