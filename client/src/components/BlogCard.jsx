import React from "react";
import "../App.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const BlogCard = ({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);

      if (data?.success) {
        Swal.fire({
          text: "Blog Deleted Successfully",
        });
        window.location.reload();
      } else {
        Swal.fire({
          text: "Failed to delete the blog",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card-main">
      <div className="card">
        <img src={image} className="card-img-top" alt="Blog-images" />
        {isUser && (
          <div className="icons">
            <i class="fa-solid fa-pen" onClick={handleEdit}></i>
            <i class="fa-solid fa-trash" onClick={handleDelete}></i>
          </div>
        )}
        <div className="card-body">
          <div className="time">
            Created At:- {moment(time).format("MMMM Do YYYY, h:mm a")}
          </div>
          <h5 className="card-title">User: {username}</h5>
          <p className="title">{title}</p>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
