import React, { useState } from "react";
import axios from "axios";

const CourseEditForm = ({ course, onCourseUpdated }) => {
  const [formData, setFormData] = useState(course);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/v1/courses/${course.id}`, formData)
      .then(() => {
        onCourseUpdated();
      })
      .catch((error) => {
        console.error("Error updating course:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="course-form">
      <h2>Edit Course</h2>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </label>
      <label>
        End Date:
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default CourseEditForm;
