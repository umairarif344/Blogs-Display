// src/Blog.js
import React, { useState, useEffect } from 'react';
import './Blog.css'; // Use this CSS file for styling

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    fetch('/data/posts.json')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        const sortedPosts = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
        setLatestPosts(sortedPosts.slice(0, 3)); // Get the latest 3 posts
        setFilteredPosts(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    setFilteredPosts(
      posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, posts]);

  return (
    <div className="blog-container">
      <div className="blog-main">
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>

        <section className="all-blogs">
          <h2 className="section-title">All Blogs</h2>
          <div className="blog-grid">
            {filteredPosts.map(post => (
              <div key={post.id} className="post-card">
                <img src={post.image} alt={post.title} className="post-image" />
                <div className="post-content">
                  <h2 className="post-title">{post.title}</h2>
                  <p className="post-date">{new Date(post.date).toLocaleDateString()}</p>
                  <p className="post-text">{post.content}</p>
                  <p className="post-author">Author: {post.author}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <aside className="latest-blogs">
        <h2 className="section-title">Latest Blogs</h2>
        <div className="blog-grid">
          {latestPosts.map(post => (
            <div key={post.id} className="post-card">
              <img src={post.image} alt={post.title} className="post-image" />
              <div className="post-content">
                <h2 className="post-title">{post.title}</h2>
                <p className="post-date">{new Date(post.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default Blog;
