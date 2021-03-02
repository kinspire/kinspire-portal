import { find, get } from "lodash";
import { stringify } from "querystring";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { useParams } from "react-router";
import { Link } from "react-router-native";
import { useSelector } from "../store";

export default function SectionPage() {
  const courses = useSelector((state) => state.contentState.courses);
  const allSections = useSelector((state) => state.contentState.sections);

  const { courseId, sectionId } = useParams<{ courseId: string; sectionId: string }>();

  const course = find(courses, (c) => c.id === courseId);
  const section = find(get(allSections, courseId), (s) => s.id === sectionId);

  console.log(section);

  return (
    <View>
      <Text>Course: {get(course, "title")}</Text>
      <Text>Section: {get(section, "title")}</Text>
      <FlatList
        data={get(section, "modules")}
        renderItem={({ item: m }) => (
          <Link to={`/module/${courseId}/${sectionId}/${m.id}`}>
            <Text>{m.title}</Text>
          </Link>
        )}
        keyExtractor={(s) => s.id}
      />
    </View>
  );
}
