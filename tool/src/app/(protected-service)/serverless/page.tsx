"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

type Post = {
  id: number;
  name: string;
  updatedAt: string;
};

interface ApiResponse {
  data: Post[];
}

const PostManager: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newPostName, setNewPostName] = useState<string>("");

  const API_URL = "http://localhost:65168";

  // Fetch all posts
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<ApiResponse>(`${API_URL}`);
      console.log(response.data.data);
      setPosts(response?.data?.data);
    } catch (err) {
      setError("Failed to fetch posts.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new post
  const createPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}`, {
        postname: newPostName,
      });
      setPosts((prev) => [...prev, response.data.post]);
      setNewPostName("");
    } catch (err) {
      setError("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  // Update a post by ID
  const updatePost = async (id: number, updatedName: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${API_URL}?id=${id}`, {
        postname: updatedName,
      });
      setPosts((prev) =>
        prev.map((post) => (post.id === id ? response.data.data : post)),
      );
    } catch (err) {
      setError("Failed to update post.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a post by ID
  const deletePost = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_URL}?id=${id}`);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      setError("Failed to delete post.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPosts(); // Await the promise here
    };
    fetchData().catch((err) =>
      console.error("Failed to fetch posts in useEffect:", err),
    );
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Post Manager</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Create New Post */}
      <div>
        <h2>Create Post</h2>
        <input
          type="text"
          value={newPostName}
          onChange={(e) => setNewPostName(e.target.value)}
          placeholder="Post name"
          className="border"
        />
        <button onClick={createPost}>Create</button>
      </div>

      {/* Display Posts */}
      <div>
        <h2>Posts</h2>
        {posts.length === 0 && <p>No posts available.</p>}
        {posts.map((post) => (
          <div key={post.id} style={{ marginBottom: "1rem" }}>
            <p>
              <strong>ID:</strong> {post.id}
            </p>
            <p>
              <strong>Name:</strong> {post.name}
            </p>

            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(post.updatedAt).toLocaleString()}
            </p>
            <div>
              <button onClick={() => updatePost(Number(post.id), newPostName)}>
                Update
              </button>
              <button onClick={() => deletePost(Number(post.id))}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostManager;
