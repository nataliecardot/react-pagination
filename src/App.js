import React, { useState, useEffect } from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  // Make request once component is mounted to DOM
  // useEffect is similiar to componentDidMount and componentDidUpdate
  // When this runs it will update the component and it would be a neverending loop. To stop that, an empty array is passed as second argument; state inside effect will retain initial values (if you wanted it to run only when certain values change, those values would be passed in). With that modification, it works like componentDidMount
  useEffect(() => {
    // Creating new function because want to use async/await, but usage of async with useEffect not supported
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('http://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current page's posts

  // For first page, would be 1 x 10 = 10
  const indexOfLastPost = currentPage * postsPerPage;
  // For first page, would be 10 - 10 = 0
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // Slice method returns new array, selecting elements starting at the given start argument, up until (but excluding) the given end argument
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  console.log(posts);
  return (
    <div className="container mt-2 mb-4">
      <h1 className="text-primary mb-3">My Blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <br />
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} />
    </div>
  );
};

export default App;
