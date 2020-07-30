// Describes a sample course

import { Course, Lesson, Module, Tier } from "./util";

// sample english course
const breakfastLesson: Lesson = {
    title: "Gopi eats breakfast!",
    id: "story1-1",
    content: "Gopi gopi gopy",
};
const level1Module: Module = {
    title: "Level 1",
    id: "level1",
    lessons: [breakfastLesson],
};
const storiesTier: Tier = {
    title: "Stories",
    id: "stories",
    modules: [level1Module],
}
const english: Course = {
    title: "English",
    id: "english",
    tiers: [storiesTier],
}

// sample health course
const lesson1: Lesson = {
    title: "Nutrition",
    id: "lesson1-1",
    content: "blah",
};
const fuelingYourBody: Module = {
    title: "Module 1: Nutrition",
    id: "level1",
    lessons: [lesson1],
};
const healthTier: Tier = {
    title: "Fueling your Body", 
    id: "tiers", 
    modules: [fuelingYourBody],
}
const health: Course = {
    title: "Health",
    id: "health",
    tiers: [healthTier],
}



export const courses = [
    english, health
]

// sample leadership course