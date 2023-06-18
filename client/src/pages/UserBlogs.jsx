import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import "../App.css";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div className="blogs-container">
      {loading ? (
        <></>
      ) : (
        <>
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => {
              return (
                <div key={blog._id}>
                  <BlogCard
                    id={blog._id}
                    isUser={true}
                    title={blog.title}
                    description={blog.description}
                    image={blog.image}
                    time={blog.createdAt}
                    username={blog.username}
                  />
                </div>
              );
            })
          ) : (
            <div className="mt-5">You Have Not Created any Blog</div>
          )}
        </>
      )}
    </div>
  );
};

export default UserBlogs;
