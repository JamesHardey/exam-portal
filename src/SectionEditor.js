import React, { useState } from "react";
import "./ExamEditor.css";

function SectionEditor({ examId,header, courseId, sections, addSection, deleteSection }) {
    const [sectionTitle, setSectionTitle] = useState("");
    const [showSectionList, setShowSectionList] = useState(false);

    const handleAdd = () => {
        if (sectionTitle.trim() !== "") {
            addSection(examId, courseId, sectionTitle);
            setSectionTitle("");
        }
    };

    return (
        <div className="exam-editor-container">
            <h2>{header} Sections</h2>
            <div className="input-section">
                <input
                    type="text"
                    placeholder="Enter Section Title"
                    value={sectionTitle}
                    onChange={(e) => setSectionTitle(e.target.value)}
                />
                <button className="add-button" onClick={handleAdd}>
                    Add
                </button>
                <button
                    className="show-button"
                    onClick={() => setShowSectionList(!showSectionList)}
                >
                    {showSectionList ? "Hide List" : "Show List"}
                </button>
            </div>
            {showSectionList && (
                <div className="exam-list">
                    {sections.map((section, index) => (
                        <div key={index} className="exam-item">
                            <div>
                                <p className="exam-title">{section.title}</p>
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

export default SectionEditor;
