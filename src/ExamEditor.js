import React, { useState } from "react";
import "./ExamEditor.css"; // Import your CSS file

function ExamEditor({ exams, addExam, deleteExam }) {
  const [examTitle, setExamTitle] = useState("");
  const [showExamList, setShowExamList] = useState(false);

  const handleAddExam = () => {
    if (examTitle.trim() !== "") {
      addExam(examTitle); 
      setExamTitle("");
      console.log(exams);
    }
  };

  const handleDeleteExam = (examIndex) => {
    deleteExam(examIndex)
  }

  return (
    <div className="exam-editor-container">
      <h2>Exams</h2>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter Exam Title"
          value={examTitle}
          onChange={(e) => setExamTitle(e.target.value)}
        />
        <button className="add-button" onClick={handleAddExam}>
          Add
        </button>


        <button
          className="show-button"
          onClick={() => setShowExamList(!showExamList)}
        >
        {showExamList ? "Hide List" : "Show List"}
        </button>
      </div>

      {showExamList && (
        <div className="exam-list">
          {exams.map((exam, index) => (
            <div key={index} className="exam-item">
              <div>
                <p className="exam-title">{exam.title}</p>
              </div>
              <button className="show-button">Show</button>
              <button className="delete-button"onClick={()=>{handleDeleteExam(index)}} >Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExamEditor;
