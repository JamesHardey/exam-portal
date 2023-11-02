import React, { useState } from "react";
import "./App.css";
import MainApp from "./MainApp";

function App() {
  const [exams, setExams] = useState([]);
  const [showExams, setShowExams] = useState(true);
  const [newExamName, setNewExamName] = useState("");

  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const menuItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  const handleMenuItemClick = (item) => {
    setSelectedMenuItem(item);
  };

  const addExam = () => {
    const newExam = { newExamName, courses: [] };
    setExams([...exams, newExam]);
    console.log(exams)
  };

  const deleteExam = (examIndex) => {
    const updatedExams = exams.filter((_, index) => index !== examIndex);
    setExams(updatedExams);
  };


  const compileExamQuestions = () => {
    console.log(exams)
  }

  return (
    <div className="App">
      
      <MainApp />
    </div>
  )
}

export default App;
