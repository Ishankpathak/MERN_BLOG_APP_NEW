import React from "react";
import "../App.css";
import moment from "moment";

const BlogCard = ({ title, description, image, username, time }) => {
  return (
    <div className="card-main">
      <div className="card">
        <img src={image} className="card-img-top" alt="Blog-images" />
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
