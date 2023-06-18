import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import "../App.css";
import { v4 as uuidv4 } from "uuid";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  //get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div className="blogs-container">
      {
        <>
          {blogs &&
            blogs.map((blog, index) => (
              <div key={uuidv4()} className="blog-content">
                <BlogCard
                  id={blog?._id}
                  isUser={
                    localStorage.getItem("userId") === blog?.user?._id || ""
                  }
                  key={index}
                  title={blog?.title}
                  description={blog?.description}
                  image={blog?.image}
                  username={blog?.user?.username}
                  time={blog?.createdAt}
                />
              </div>
            ))}
        </>
      }
    </div>
  );
};

export default Blogs;
