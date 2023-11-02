import React, { useState } from "react";
import "./ExamEditor.css";

function CourseEditor({ examId,header, courses, addCourse, deleteCourse }) {
    const [courseTitle, setCourseTitle] = useState("");
    const [showCourseList, setShowCourseList] = useState(false);

    const handleAdd = () => {
        if (courseTitle.trim() !== "") {
            addCourse(examId, courseTitle);
            setCourseTitle("");
        }
    };

    return (
        <div className="exam-editor-container">
            <h2>{header} Courses</h2>
            <div className="input-section">
                <input
                    type="text"
                    placeholder="Enter Course Title"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                />
                <button className="add-button" onClick={handleAdd}>
                    Add
                </button>
                <button
                    className="show-button"
                    onClick={() => setShowCourseList(!showCourseList)}
                >
                    {showCourseList ? "Hide List" : "Show List"}
                </button>
            </div>
            {showCourseList && (
                <div className="exam-list">
                    {courses.map((course, index) => (
                        <div key={index} className="exam-item">
                            <div>
                                <p className="exam-title">{course.title}</p>
                            </div>
                            <button className="show-button">Show</button>
                            <button className="delete-button">Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CourseEditor;
