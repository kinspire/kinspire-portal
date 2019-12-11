import React from "react";

import Selection from "../components/Selection";

const materials = [
  { name: "Resume/CV Templates", link: "/materials/templates" },
  { name: "Writing Tips", link: "/materials/tips" },
  { name: "Career Paths", link: "/materials/careerpaths" },
  { name: "Health & Wellness", link: "/materials/health" },
];
export default function Materials() {
  return <Selection items={materials} />;
}
