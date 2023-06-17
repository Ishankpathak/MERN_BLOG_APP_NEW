import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import "../App.css";
import { v4 as uuidv4 } from "uuid";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  //get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div className="blogs-container">
      {loading ? (
        <div className="spinner-border text-secondary mt-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          {blogs &&
            blogs.map((blog, index) => (
              <div key={uuidv4()}>
                <BlogCard
                  key={index}
                  title={blog.title}
                  description={blog.description}
                  image={blog.image}
                  username={blog.user.username}
                  time={blog.createdAt}
                />
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Blogs;
