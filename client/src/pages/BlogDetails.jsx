import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../App.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  //get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogDetail();
  }, [id]);
  console.log(blog);

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
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        Swal.fire({
          text: "Blog Updated Successfully",
        });
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {" "}
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="mb-3">
          <div className="heading">Edit Blog</div>
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
          <button type="submit" className="btn btn-warning create-btn">
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default BlogDetails;
