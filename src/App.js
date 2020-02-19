import React, { useState, useEffect } from 'react';
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

  console.log(posts);
  return (
    <div className="container">
      <h1>My App</h1>
    </div>
  );
};

export default App;
