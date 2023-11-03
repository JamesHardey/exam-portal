import React, { useState } from "react";
import "./ExamEditor.css";

function SectionEditor({ examId, header, courseId, sections, addSection, deleteSection, onShowSection }) {
    const [sectionTitle, setSectionTitle] = useState("");
    const [sectionInstruction, setSectionInstruction] = useState("");
    const [sectionPassage, setSectionPassage] = useState("");
    const [showSectionList, setShowSectionList] = useState(false);

    const handleAdd = () => {
        if (sectionTitle.trim() !== "") {
            addSection(examId, courseId, sectionTitle, sectionInstruction, sectionPassage);
            setSectionTitle("");
            setSectionInstruction("");
            setSectionPassage("");
        }
    };

    return (
        <div className="exam-editor-container">
            <h2>{header} Sections</h2>

            <textarea
                placeholder="Enter Instruction"
                value={sectionInstruction}
                onChange={(e) => setSectionInstruction(e.target.value)}
                rows={2}
            >
            </textarea>

            <textarea
                placeholder="Enter Passage"
                value={sectionPassage}
                onChange={(e) => setSectionPassage(e.target.value)}
                rows={3}
            >
            </textarea>


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
                            <button className="show-button" onClick={onShowSection}>Show</button>
                            <button className="delete-button">Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SectionEditor;
