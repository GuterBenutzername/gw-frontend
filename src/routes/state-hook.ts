import { create } from "zustand";

export type Course = {
  id: string;
  name: string;
  assignments: Assignment[];
};

export type Assignment = {
  name: string;
  grade: number;
  weight: number;
  weight_complex?: number;
  id: string;
};

export const useGWState = create<{
  courses: Course[];
  setCourseState: (courses: Course[]) => void;
  loadCourses: () => Promise<void>;
}>((set) => {
  return {
    courses: [],
    setCourseState(courses: Course[]) {
      set({ courses });
    },
    async loadCourses() {
      const response = await fetch("http://localhost:3000/courses");
      const courses = await response.json();
      for (const course of courses) {
        const course_assignments_response = await fetch(
          `http://localhost:3000/assignments?course_id=eq.${course.id}`,
        );
        course.assignments = await course_assignments_response.json();
      }
      set({ courses });
    },
  };
});
