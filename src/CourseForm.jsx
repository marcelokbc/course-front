import React, { useState } from "react";
import axios from "axios";
import "./CourseForm.css";

const CourseForm = ({ onCourseAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    end_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/v1/courses", formData)
      .then((response) => {
        onCourseAdded(response.data);
        setFormData({ title: "", description: "", end_date: "" });
      })
      .catch((error) => {
        console.error("Error adding course:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="course-form">
      <h2>Add a New Course</h2>
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
      <button type="submit">Add Course</button>
    </form>
  );
};

export default CourseForm;
