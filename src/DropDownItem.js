import React, { useState } from "react";
import './DropDownItem.css'

// function DropdownItem({ title, exams, onItemClicked }) {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const toggleExpansion = () => {
//     setIsExpanded(!isExpanded);
//   };

//   const handleItemClick = (examId) => {
//     onItemClicked("");
//   };

//   return (
//     <div className={`dropdown-item ${isExpanded ? 'expanded' : ''}`}>
//       <div className="title">
//         <p onClick={handleItemClick}>{title}</p>
//         <span className={`arrow ${isExpanded ? 'expanded' : ''} `} onClick={toggleExpansion}>▶</span>
//       </div>
//       <ul className="item-list">
//         {exams.map((item, index) => (
//           <li key={index}>
//             <ExamsDropdownItem
//               title={item.title}
//               courses={item.courses}
//               onItemClicked={onItemClicked} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


function ExamsDropdownItem({
  examId,
  title,
  courses,
  onItemClicked,
  handleExamClicked,
  onCourseClicked,
  onSectionClicked
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCourseClick = (courseIndex) => {
    console.log("Course: "+courseIndex)
    onItemClicked("Sections");
    onCourseClicked(examId, courseIndex)
  };


  return (
    <div className={`dropdown-item ${isExpanded ? 'expanded' : ''}`}>
      <div className="title">
        <p onClick={handleExamClicked}>{title}</p>
        <span className={`arrow ${isExpanded ? 'expanded' : ''} `} onClick={toggleExpansion}>▶</span>
      </div>
      <ul className="item-list">
        {courses.map((item, index) => (
          <li key={index}>
            <CoursesDropdownItem
              examId={examId}
              courseId={index}
              title={item.title}
              sections={item.sections}
              onItemClicked={onItemClicked}
              handleCourseClick={() => {handleCourseClick(index)}}
              onSectionClicked={onSectionClicked}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}



function CoursesDropdownItem({
  examId,
  courseId,
  title,
  sections,
  onItemClicked,
  handleCourseClick,
  onSectionClicked
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSectionClick = (sectionIndex) => {
    onItemClicked("Questions");
    onSectionClicked(examId, courseId, sectionIndex)
    console.log("section clicked")
  };


  return (
    <div className={`dropdown-item ${isExpanded ? 'expanded' : ''}`}>
      <div className="title">
        <p onClick={handleCourseClick}>{title}</p>
        <span className={`arrow ${isExpanded ? 'expanded' : ''} `} onClick={toggleExpansion}>▶</span>
      </div>
      <ul className="item-list">
        {sections.map((item, index) => (
          <li key={index}>
            <SectionsDropdownItem
              examId={examId}
              courseId={courseId}
              sectionId={index}
              title={item.title}
              handleSectionClick={()=>{handleSectionClick(index)}}
              // items={item.items}
              onItemClicked={onItemClicked} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionsDropdownItem({
  examId,
  courseId,
  sectionId,
  title,
  handleSectionClick
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };


  return (
    <div className={`dropdown-item ${isExpanded ? 'expanded' : ''}`}>
      <div className="title">
        <p onClick={handleSectionClick}>{title}</p>
        <span className={`arrow ${isExpanded ? 'expanded' : ''} `} onClick={toggleExpansion}>▶</span>
      </div>
    </div>
  );
}


export default ExamsDropdownItem;
// export default DropdownItem;
