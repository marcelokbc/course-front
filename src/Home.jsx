import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import CourseForm from "./CourseForm";
import CourseEditForm from "./CourseEditForm";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios
      .get("http://localhost:3000/api/v1/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  };

  const deleteCourse = (id) => {
    axios
      .delete(`http://localhost:3000/api/v1/courses/${id}`)
      .then(() => {
        fetchCourses();
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
      });
  };

  const handleEditClick = (course) => {
    setEditingCourse(course);
  };

  const handleCourseUpdated = () => {
    setEditingCourse(null);
    fetchCourses();
  };

  return (
    <div className="container">
      {editingCourse ? (
        <CourseEditForm
          course={editingCourse}
          onCourseUpdated={handleCourseUpdated}
        />
      ) : (
        <CourseForm onCourseAdded={fetchCourses} />
      )}
      <h1>Courses</h1>
      <div className="grid">
        {courses.map((course) => (
          <div key={course.id} className="card">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p>
              <strong>End Date:</strong>{" "}
              {new Intl.DateTimeFormat("pt-BR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).format(new Date(course.end_date))}
            </p>
            <h3>Videos</h3>
            {course.videos.map((video, index) => (
              <div key={index}>
                <p><strong>Title:</strong> {video.title}</p>
                <p>
                  <strong>URL:</strong>{" "}
                  <a href={video.url} target="_blank" rel="noopener noreferrer">
                    {video.url}
                  </a>
                </p>
                <p><strong>Size:</strong> {video.size} MB</p>
              </div>
            ))}

            <button onClick={() => handleEditClick(course)}>Editar</button>
            <button onClick={() => deleteCourse(course.id)}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
