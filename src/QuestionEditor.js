import React, { useState } from "react";
import "./ExamEditor.css"; // Import your CSS file

function QuestionEditor({
    examTitle,
    courseTitle,
    section,
    updateSection,
    addQuestion,
    deleteQuestion
}) {
    const [question, setQuestion] = useState("");
    const [showQuestionList, setShowQuestionList] = useState(false);
    const [passageText, setPassageText] = useState(section.passage);
    const [instructionText, setInstructionText] = useState(section.instruction);
    const [options, setOptions] = useState([
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
    ]);

    const handleAddQuestion = () => {
        if (question.trim() !== "") {
            const questionObject = {
                content: question,
                options: options,
            };
            addQuestion(questionObject);
            updateSection(passageText, instructionText);
            setQuestion("");
            setOptions([
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
            ]);
        }
    };

    const handleDeleteQuestion = (questionIndex) => {
        deleteQuestion(questionIndex);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index].text = value;
        setOptions(newOptions);
    };

    const handleCorrectOptionChange = (index, isChecked) => {
        const newOptions = [...options];
        newOptions[index].isCorrect = isChecked;
        setOptions(newOptions);
    };

    const handleUpdateSectionPassage = (pass) => {
        setPassageText(pass)
        updateSection(passageText, instructionText);
    };

    const handleUpdateSectionInstruction = (instr) => {
        setInstructionText(instr)
        updateSection(passageText, instructionText);
    };

    return (
        <div className="exam-editor-container">
            <p>Exam: {examTitle} Course: {courseTitle} Section: {section.title}</p>
            <div className="input-area">
                <textarea
                    placeholder="Enter Instruction"
                    value={instructionText}
                    onChange={(e) => handleUpdateSectionInstruction(e.target.value)}
                    rows={2}
                >
                </textarea>

                <textarea
                    placeholder="Enter Passage"
                    value={passageText}
                    onChange={(e) => handleUpdateSectionPassage(e.target.value)}
                    rows={3}
                >
                </textarea>

                <h3 style={{
                    marginTop: "10px",
                    marginBottom: "5px",
                    width: "100%",
                    textAlign: "left"
                }}>Add Question</h3>

                <textarea
                    placeholder="Enter Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={6}
                >
                </textarea>

            </div>

            <div className="option-list">
                <h3>Options:</h3>
                {options.map((option, index) => (
                    <div key={index} className="option-item">
                        <p>Option: {index + 1} </p>
                        <input
                            type="text"
                            value={option.text}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                        <label>

                            <input
                                type="checkbox"
                                checked={option.isCorrect}
                                onChange={(e) => handleCorrectOptionChange(index, e.target.checked)}
                            />
                        </label>
                    </div>
                ))}
            </div>

            <div>
                <button className="add-button" onClick={handleAddQuestion}>
                    Add
                </button>
                <button
                    className="show-button"
                    onClick={() => setShowQuestionList(!showQuestionList)}
                >
                    {showQuestionList ? "Hide List" : "Show List"}
                </button>

            </div>


            {showQuestionList && (
                <div className="exam-list-question">
                    <p>Instruction: {section.instruction}</p>
                    <p>Passage: {section.passage}</p>
                    {section.questions.map((question, index) => (
                        <div key={index} className="exam-item">
                            <div>
                                <h3>Question {index + 1}:</h3>
                                <p className="exam-title">{question.question}</p>
                                <ul>
                                    {question.options.map((option, index) => (
                                        <li key={index} className={`opt ${option.isCorrect ? 'answ' : ''}`}>
                                            {index + 1}: {option.text}
                                            {option.isCorrect && " (Correct)"}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button className="delete-button" onClick={()=>handleDeleteQuestion(index)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default QuestionEditor;