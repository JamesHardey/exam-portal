import React, { useState } from "react";
import "./MainApp.css";
import SideNav from "./SideNav";
import ExamEditor from "./ExamEditor";
import CourseEditor from "./CourseEditor";
import SectionEditor from "./SectionEditor";
import QuestionEditor from "./QuestionEditor";
import { saveAs } from "file-saver";

function MainApp() {
    const [exams, setExams] = useState([]);
    const [examIndex, setExamIndex] = useState(-1);
    const [courseIndex, setCourseIndex] = useState(-1);
    const [sectionIndex, setSectionIndex] = useState(-1);

    const [showExams, setShowExams] = useState(true);
    const [newExamName, setNewExamName] = useState("");
    const [selectedMenuItem, setSelectedMenuItem] = useState("Exams");

    const handleMenuItemClick = (item) => {
        setSelectedMenuItem(item);
    };

    const addExam = (title) => {
        const newExam = { type: "Exams", title: title, courses: [] };
        setExams([...exams, newExam]);
    };

    const deleteExam = (examIndex) => {
        const updatedExams = exams.filter((_, index) => index !== examIndex);
        setExams(updatedExams);
    };

    
    const deleteCourse = (examIndex, courseIndex) => {
        const updatedExams = [...exams];
        updatedExams[examIndex].courses = updatedExams[examIndex].courses.filter(
            (_, index) => index !== courseIndex
        );
        setExams(updatedExams);
    };

    const deleteSection = (examIndex, courseIndex, sectionIndex) => {
        const updatedExams = [...exams];
        updatedExams[examIndex].courses[courseIndex].sections = updatedExams[examIndex].courses[courseIndex].sections.filter(
            (_, index) => index !== sectionIndex
        );
        setExams(updatedExams);
    };

    const deleteQuestion = (examIndex, courseIndex, sectionIndex, questionIndex) => {
        const updatedExams = [...exams];
        updatedExams[examIndex].courses[courseIndex].sections[sectionIndex].questions = updatedExams[examIndex].courses[courseIndex].sections[sectionIndex].questions.filter(
            (_, index) => index !== questionIndex
        );
        setExams(updatedExams);
    };

    const addCourse = (examIndex, title) => {
        const newCourse = {
            type: "Course",
            title: title,
            sections: [],
        };
        const updatedExams = [...exams];
        updatedExams[examIndex].courses.push(newCourse);
        setExams(updatedExams);
    };

    const addSection = (examIndex, courseIndex, title) => {
        const newSection = {
            type: "Section",
            title: title,
            passage: "",
            instruction: "",
            questions: [],
        };
        const updatedExams = [...exams];
        updatedExams[examIndex].courses[courseIndex].sections.push(newSection);
        setExams(updatedExams);
    };

    const updateSection = (passage, instruction) => {
        const updatedExams = [...exams];
        updatedExams[examIndex].courses[courseIndex].sections[sectionIndex].passage = passage;
        updatedExams[examIndex].courses[courseIndex].sections[sectionIndex].instruction = instruction;
        setExams(updatedExams);
    };

    const addQuestion = (examIndex, courseIndex, sectionIndex, newQuestion) => {
        const updatedExams = [...exams];
        updatedExams[examIndex].courses[courseIndex].sections[sectionIndex].questions.push(newQuestion);
        setExams(updatedExams);
    };

    const onExamListClicked = () => {
        handleMenuItemClick("Exams");
    };

    const onExamClicked = (examIndex) => {
        setExamIndex(examIndex);
    };

    const onCourseClicked = (examIndex, courseIndex) => {
        setExamIndex(examIndex);
        setCourseIndex(courseIndex);
    };

    const onSectionClicked = (examIndex, courseIndex, sectionIndex) => {
        setExamIndex(examIndex);
        setCourseIndex(courseIndex);
        setSectionIndex(sectionIndex);
    };

    

    const exportDataToTxt = () => {
        const formattedData = exams.map((exam) => {
            const examText = '';

            const courseText = exam.courses.map((course) => {
                
                const courseSectionText = course.sections.map((section) => {

                    const coursT = `guidelines:\ncourse:${exam.title}_${course.title}`

                    const sectionText = `\n\nsection:${section.title}\ninstruction:${section.instruction}\npassage:${section.passage}`;

                    const questionText = section.questions.map((question) => {
                        const questionContent = `\n\nQuestion:\nContent:${question.content}`;

                        const options = question.options.map((option) => {

                            console.log(`Option----${option.text}`)
                            if(option.isCorrect){
                                return `\nAnswer: ${option.text}`;
                            }
                            else return `\nOption: ${option.text}`;
                        });


                        return `${questionContent}${options.join('')}`;
                    });

                    return `${coursT}${sectionText}${questionText.join('')}`;
                });

                return courseSectionText.join('\n\n');
            });

            return `${examText}${courseText}\n`;
        });

        const allDataText = formattedData.join('\n');

        // Generate a unique filename for the exported text file
        const timestamp = new Date().getTime();
        const filename = `exam_data_${timestamp}.txt`;

        // Create a Blob with the formatted data
        const blob = new Blob([allDataText], { type: "text/plain;charset=utf-8" });

        // Use FileSaver to save the Blob as a text file
        saveAs(blob, filename);
    };

    return (
        <div className="app">
            <div className="header">
                <button onClick={onExamListClicked}>Exam List</button>
                <h2>Exam Editor</h2>
                <button onClick={exportDataToTxt}>Compile</button>
            </div>
            <div className="main">
                <div className="sideNav">
                    <SideNav
                        exams={exams}
                        onItemClicked={handleMenuItemClick}
                        onExamClicked={onExamClicked}
                        onCourseClicked={onCourseClicked}
                        onSectionClicked={onSectionClicked}
                    />
                </div>

                <div className="main-content">
                    {selectedMenuItem === "Exams" && (
                        <ExamEditor
                            exams={exams}
                            addExam={addExam}
                            deleteExam={deleteExam}
                        />
                    )}

                    {selectedMenuItem === "Courses" && (
                        <CourseEditor
                            examId={examIndex}
                            header={exams[examIndex].title}
                            courses={exams[examIndex].courses}
                            addCourse={addCourse}
                            deleteCourse={()=>deleteCourse(examIndex, courseIndex)}
                        />
                    )}

                    {selectedMenuItem === "Sections" && (
                        <SectionEditor
                            examId={examIndex}
                            header={exams[examIndex].courses[courseIndex].title}
                            courseId={courseIndex}
                            sections={exams[examIndex].courses[courseIndex].sections}
                            addSection={addSection}
                            deleteSection={()=> {deleteSection(examIndex, courseIndex, sectionIndex)}}
                        />
                    )}

                    {selectedMenuItem === "Questions" && (
                        <QuestionEditor
                            examTitle={exams[examIndex].title}
                            courseTitle={exams[examIndex].courses[courseIndex].title}
                            section={exams[examIndex].courses[courseIndex].sections[sectionIndex]}
                            updateSection={updateSection}
                            addQuestion={(newQuestion) => {
                                addQuestion(examIndex, courseIndex, sectionIndex, newQuestion);
                            }}
                            deleteQuestion={(questionIndex)=>deleteQuestion(examIndex, courseIndex, sectionIndex, questionIndex)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}


export default MainApp;