import { useState } from "react";
import "./grades.css";
import { FaPlus } from "react-icons/fa";

const fakeData = [
  {
    name: "Course A",
    assignments: [
      { name: "Assignment 1", grade: 100, portion_of_grade: 0.2, t: false },
      { name: "Assignment 2", grade: 90, portion_of_grade: 0.1, t: false },
      { name: "Assignment 3", grade: 0, portion_of_grade: 0.3, t: true },
    ],
  },
  {
    name: "Course B",
    assignments: [
      { name: "Assignment 3", grade: 100, portion_of_grade: 0.2, t: false },
      { name: "Assignment 4", grade: 9, portion_of_grade: 0.1, t: false },
      { name: "Assignment 5", grade: -12, portion_of_grade: 0, t: true },
      { name: "Assignment 4", grade: 9, portion_of_grade: 0.1, t: false },
      { name: "Assignment 5", grade: -12, portion_of_grade: 0, t: true },
      { name: "Assignment 4", grade: 9, portion_of_grade: 0.1, t: false },
      { name: "Assignment 5", grade: -12, portion_of_grade: 0, t: true },
      { name: "Assignment 4", grade: 9, portion_of_grade: 0.1, t: false },
      { name: "Assignment 5", grade: -12, portion_of_grade: 0, t: true },
      { name: "Assignment 4", grade: 9, portion_of_grade: 0.1, t: false },
      { name: "Assignment 5", grade: -12, portion_of_grade: 0, t: true },
      { name: "Assignment 4", grade: 9, portion_of_grade: 0.1, t: false },
      { name: "Assignment 5", grade: -12, portion_of_grade: 0, t: true },
      { name: "Assignment 4", grade: 9, portion_of_grade: 0.1, t: false },
      { name: "Assignment 5", grade: -12, portion_of_grade: 0, t: true },
    ],
  },
];

export default function Grades() {
  const [currentSelectedCourse, setCurrentSelectedCourse] = useState(
    fakeData[0]
  );
  return (
    <div className="grades">
      <span className="selected-course-wrapper">
        <select
          className="selected-course"
          value={currentSelectedCourse.name}
          onChange={(e) =>
            setCurrentSelectedCourse(
              fakeData.find((course) => course.name === e.target.value) ??
                fakeData[0]
            )
          }
        >
          {fakeData.map((course) => (
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
            {currentSelectedCourse.assignments.map((assignment, index) => (
              <tr key={index}>
                <td>
                  <input
                    className="grades-input"
                    type="text"
                    value={assignment.name}
                    onChange={(e) => {
                      const newAssignments = [
                        ...currentSelectedCourse.assignments,
                      ];
                      newAssignments[index].name = e.target.value;
                      setCurrentSelectedCourse({
                        ...currentSelectedCourse,
                        assignments: newAssignments,
                      });
                    }}
                  />
                </td>
                <td>
                  <input
                    className="grades-input"
                    type="number"
                    value={assignment.grade}
                    onChange={(e) => {
                      const newAssignments = [
                        ...currentSelectedCourse.assignments,
                      ];
                      newAssignments[index].grade = parseInt(e.target.value);
                      setCurrentSelectedCourse({
                        ...currentSelectedCourse,
                        assignments: newAssignments,
                      });
                    }}
                  />
                </td>
                <td>
                  <input
                    className="grades-input"
                    type="number"
                    value={assignment.portion_of_grade}
                    onChange={(e) => {
                      const newAssignments = [
                        ...currentSelectedCourse.assignments,
                      ];
                      newAssignments[index].portion_of_grade = parseFloat(
                        e.target.value
                      );
                      setCurrentSelectedCourse({
                        ...currentSelectedCourse,
                        assignments: newAssignments,
                      });
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="add-assignment"
          onClick={() => {
            const newAssignments = [...currentSelectedCourse.assignments];
            newAssignments.push({
              name: "",
              grade: 0,
              portion_of_grade: 0,
              t: false,
            });
            setCurrentSelectedCourse({
              ...currentSelectedCourse,
              assignments: newAssignments,
            });
          }}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}
