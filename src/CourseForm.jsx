import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./CourseForm.css";

const CourseForm = () => {
  const [videos, setVideos] = useState([{ title: "", url: "", size: "" }]);
  const [course, setCourse] = useState({
    title: "",
    description: "",
    end_date: "",
  });

  const handleVideoChange = (index, field, value) => {
    const updatedVideos = [...videos];
    updatedVideos[index][field] = value;
    setVideos(updatedVideos);
  };

  const addVideo = () => {
    setVideos([...videos, { title: "", url: "", size: "" }]);
  }

  const removeVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    const payload = {...course, videos_attributes: videos};
    axios
      .post("http://localhost:3000/api/v1/courses", payload)
      .then((response) => {
        // Show success message
        Swal.fire({
          title: "Curso Criado!",
          text: "Seu curso foi salvo com sucesso.",
          icon: "success",
          confirmButtonText: "OK",
        });

        setCourse({ title: "", description: "", end_date: "" });
        setVideos([{ title: "", url: "", size: "" }]);
      })
      .catch((error) => {
        Swal.fire({
          title: "Erro!",
          text: "Houve um problema ao salvar o curso. Tente novamente.",
          icon: "error",
          confirmButtonText: "OK",
        });

        console.error("Error creating course:", error);
      });
    };

  return (
    <form onSubmit={handleSubmit} className="course-form">
      <h2>Novo Curso</h2>
      <label>
        Título:
        <input
          type="text"
          name="title"
          value={course.title}
          onChange={(e) => setCourse({ ...course, title: e.target.value })}
          required
        />
      </label>
      <label>
        Descrição:
        <textarea
          name="description"
          value={course.description}
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
          required
        ></textarea>
      </label>
      <label>
        Data de Término:
        <input
          type="date"
          name="end_date"
          value={course.end_date}
          onChange={(e) => setCourse({ ...course, end_date: e.target.value })}
          required
        />
      </label>
      <h3>Videos</h3>
      {videos.map((video, index) => (
        <div key={index}>
          <label>Title:</label>
          <input
            type="text"
            value={video.title}
            onChange={(e) => handleVideoChange(index, "title", e.target.value)}
          />
          <label>URL:</label>
          <input
            type="text"
            value={video.url}
            onChange={(e) => handleVideoChange(index, "url", e.target.value)}
          />
          <label>Tamanho:</label>
          <input
            type="number"
            value={video.size}
            onChange={(e) => handleVideoChange(index, "size", e.target.value)}
          />
          <button type="button" onClick={() => removeVideo(index)}>Excluir Video</button>
        </div>
      ))}
      
      <div className="buttons">
        <button type="button" onClick={addVideo}>Adicionar Video</button>
        <button type="submit">Salvar Curso</button>
      </div>
    </form>
  );
};

export default CourseForm;
