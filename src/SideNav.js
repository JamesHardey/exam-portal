import React from 'react';
import ExamsDropdownItem from './DropDownItem';

function SideNav({
  exams,
  onItemClicked,
  onExamClicked,
  onCourseClicked,
  onSectionClicked }) {

  const handleExamClicked = (examId) => {
    onItemClicked("Courses");
    onExamClicked(examId)
  }

  return (
    <div className="side-nav">
      {exams.map((item, index) => (
        <ExamsDropdownItem
          key={index}
          examId={index}
          title={item.title}
          courses={item.courses}
          onItemClicked={onItemClicked}
          handleExamClicked={() => {
            handleExamClicked(index)
          }}
          onCourseClicked={onCourseClicked}
          onSectionClicked={onSectionClicked}
        />
      ))}
    </div>
  );
}

export default SideNav;
