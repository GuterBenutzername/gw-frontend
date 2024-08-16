import { useState } from "react";
import "./grades.css";
import { FaPlus } from "react-icons/fa";
import { produce } from "immer";
import { useGWState, Course, Assignment } from "../state-hook";

export default function Grades() {
  const courses = useGWState((state: { courses: Course[] }) => state.courses);
  const setCourseState = useGWState(
    (state: { setCourseState: (courses: Course[]) => void }) =>
      state.setCourseState
  );
  const [currentSelectedCourse, setCurrentSelectedCourse] = useState(0);
  return (
    <div className="grades">
      <span className="selected-course-wrapper">
        <select
          className="selected-course"
          value={courses[currentSelectedCourse].name}
          onChange={(e) =>
            setCurrentSelectedCourse(
              courses.findIndex(
                (course: Course) => course.name === e.target.value
              )
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
                <tr key={index}>
                  <td>
                    <input
                      className="grades-input"
                      type="text"
                      value={assignment.name}
                      onChange={(e) => {
                        setCourseState(
                          produce(courses, (draft) => {
                            draft[currentSelectedCourse].assignments[
                              index
                            ].name = e.target.value;
                          })
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input
                      className="grades-input"
                      type="number"
                      value={assignment.grade}
                      onChange={(e) => {
                        setCourseState(
                          produce(courses, (draft) => {
                            draft[currentSelectedCourse].assignments[
                              index
                            ].grade = parseFloat(e.target.value);
                          })
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input
                      className="grades-input"
                      type="number"
                      value={assignment.weight}
                      onChange={(e) => {
                        setCourseState(
                          produce(courses, (draft) => {
                            draft[currentSelectedCourse].assignments[
                              index
                            ].weight = parseFloat(e.target.value);
                          })
                        );
                      }}
                    />
                  </td>
                </tr>
              )
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
                });
              })
            );
          }}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}
