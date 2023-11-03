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

    const addSection = (examIndex, courseIndex, title, instruction, passage) => {
        const newSection = {
            type: "Section",
            title: title,
            passage: passage,
            instruction: instruction,
            questions: [],
        };
        const updatedExams = [...exams];
        updatedExams[examIndex].courses[courseIndex].sections.push(newSection);
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

    const onShowExam = (examIndex) => {
        handleMenuItemClick("Courses");
        onExamClicked(examIndex)
    }

    const onShowCourse = (examIndex, courseIndex) => {
        onCourseClicked(examIndex, courseIndex)
        handleMenuItemClick("Sections");
    }

    const onShowSection = (examIndex, courseIndex, sectionIndex) => {
        onSectionClicked(examIndex, courseIndex, sectionIndex)
        handleMenuItemClick("Questions");
    }

    

    const exportDataToTxt = () => {
        const formattedData = exams.map((exam) => {
            const examText = `Exam: ${exam.title}\n\n`;

            const courseText = exam.courses.map((course) => {
                
                const coursT = `guidelines:\ncourse:${exam.title}_${course.title}`

                const courseSectionText = course.sections.map((section) => {

                    const sectionText = `\n\nsection:${section.title}\ninstruction:${section.instruction}\npassage:${section.passage}`;

                    const questionText = section.questions.map((question) => {

                        const questionContent = `\n\nQuestion:\nContent:${question.content}`;

                        const options = question.options.map((option) => {

                            if(option.isCorrect){
                                return `\nAnswer: ${option.text}`;
                            }
                            else return `\nOption: ${option.text}`;
                        });

                        return `${questionContent}${options.join('')}`;
                    });

                    return `${sectionText}${questionText.join('')}`;
                });

                return `${coursT}${courseSectionText.join('')}`;
            });

            return `${examText}${courseText.join('\n\n')}\n`;
        });

        const allDataText = formattedData.join('\n');

        const timestamp = new Date().getTime();
        const filename = `exam_data_${timestamp}.txt`;

        const blob = new Blob([allDataText], { type: "text/plain;charset=utf-8" });

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
                            onShowExam={() => onShowExam(examIndex)}
                        />
                    )}

                    {selectedMenuItem === "Courses" && (
                        <CourseEditor
                            examId={examIndex}
                            header={exams[examIndex].title}
                            courses={exams[examIndex].courses}
                            addCourse={addCourse}
                            deleteCourse={()=>deleteCourse(examIndex, courseIndex)}
                            onShowCourse={() => onShowCourse(examIndex, courseIndex)}
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
                            onShowSection={() => onShowSection(examIndex, courseIndex, sectionIndex)}
                        />
                    )}

                    {selectedMenuItem === "Questions" && (
                        <QuestionEditor
                            examTitle={exams[examIndex].title}
                            courseTitle={exams[examIndex].courses[courseIndex].title}
                            section={exams[examIndex].courses[courseIndex].sections[sectionIndex]}
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