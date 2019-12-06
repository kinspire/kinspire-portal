import * as React from "react";

import Selection from "../components/Selection";
import { ViewConstants as V } from "../constants";

const materials = [
  { name: "Resume/CV Templates", link: "/materials/templates" },
  { name: "Writing Tips", link: "/materials/tips" },
  { name: "Career Paths", link: "/materials/careerpaths" },
  { name: "Health & Wellness", link: "/materials/health" },
];
export default function Materials() {
  return <Selection view={V.MATERIALS} items={materials} />;
}
