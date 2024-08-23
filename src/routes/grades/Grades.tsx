import { useState } from "react";
import "./grades.css";
import { FaPlus } from "react-icons/fa";
import { produce } from "immer";
import { useGWState, Course, Assignment } from "../state-hook";
import calculateAverage from "./calc-grades";
import { v4 as uuidv4 } from "uuid";

export default function Grades() {
  const courses = useGWState((state: { courses: Course[] }) => state.courses);
  const setCourseState = useGWState(
    (state: { setCourseState: (courses: Course[]) => void }) =>
      state.setCourseState,
  );
  const [currentSelectedCourse, setCurrentSelectedCourse] = useState(0);
  return (
    <div className="grades">
      <span className="selected-course-wrapper">
        <select
          className="selected-course"
          value={courses[currentSelectedCourse].name}
          onChange={(event) =>
            setCurrentSelectedCourse(
              courses.findIndex(
                (course: Course) => course.name === event.target.value,
              ),
            )
          }
        >
          {courses.map((course: Course) => (
            <option key={course.name} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>
      </span>
      <div className="grades-table-wrapper">
        <h1>
          {calculateAverage(courses[currentSelectedCourse].assignments).toFixed(
            2,
          )}
        </h1>
        <table className="grades-table">
          <thead>
            <tr>
              <th>Assignment</th>
              <th>Grade</th>
              <th>Portion of Grade</th>
            </tr>
          </thead>
          <tbody>
            {courses[currentSelectedCourse].assignments.map(
              (assignment: Assignment, index: number) => (
                <tr key={assignment.id}>
                  <td>
                    <input
                      className="grades-input"
                      type="text"
                      value={assignment.name}
                      onChange={(event) => {
                        setCourseState(
                          produce(courses, (draft) => {
                            draft[currentSelectedCourse].assignments[
                              index
                            ].name = event.target.value;
                          }),
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input
                      className="grades-input"
                      type="number"
                      value={assignment.grade}
                      onChange={(event) => {
                        setCourseState(
                          produce(courses, (draft) => {
                            draft[currentSelectedCourse].assignments[
                              index
                            ].grade = Number.parseFloat(event.target.value);
                          }),
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input
                      className="grades-input"
                      type="number"
                      step="0.1"
                      value={assignment.weight}
                      onChange={(event) => {
                        setCourseState(
                          produce(courses, (draft) => {
                            draft[currentSelectedCourse].assignments[
                              index
                            ].weight = Number.parseFloat(event.target.value);
                          }),
                        );
                      }}
                    />
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
        <button
          className="add-assignment"
          onClick={() => {
            setCourseState(
              produce(courses, (draft) => {
                draft[currentSelectedCourse].assignments.push({
                  name: "",
                  grade: 0,
                  weight: 0,
                  id: uuidv4(),
                });
              }),
            );
          }}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}
