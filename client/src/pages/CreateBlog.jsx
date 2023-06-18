import "../App.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  //input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(inputs);
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        Swal.fire({
          text: "Blog Created Successfully",
        });
        navigate("/my-blog");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="mb-3">
          <div className="heading">Create Blog</div>
          <label className="form-label">Title</label>
          <input
            className="form-control form-New"
            value={inputs.title}
            onChange={handleChange}
            name="title"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            className="form-control form-New"
            value={inputs.description}
            onChange={handleChange}
            name="description"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image Url</label>
          <input
            className="form-control form-New"
            value={inputs.image}
            onChange={handleChange}
            name="image"
            required
          />
        </div>

        <div className="button">
          <button type="submit" className="btn btn-primary create-btn">
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateBlog;
