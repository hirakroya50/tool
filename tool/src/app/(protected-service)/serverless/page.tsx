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

  const API_URL = process.env.NEXT_PUBLIC_SERVERLESS_BACKEND;

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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-4 text-center text-2xl font-bold">Post Manager</h1>
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Create New Post */}
      <div className="mb-6 rounded bg-white p-4 shadow">
        <h2 className="mb-4 text-xl font-semibold">Create Post</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={newPostName}
            onChange={(e) => setNewPostName(e.target.value)}
            placeholder="Post name"
            className="flex-1 rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={createPost}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </div>

      {/* Display Posts */}
      <div className="h-[calc(100vh-15rem)] overflow-auto rounded border border-red-600 bg-white p-4 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          Total Posts: {posts?.length}{" "}
        </h2>
        {posts.length === 0 && (
          <p className="text-gray-500">No posts available.</p>
        )}
        {posts.map((post) => (
          <div key={post.id} className="border-b border-gray-200 py-4">
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
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => updatePost(Number(post.id), newPostName)}
                className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
              >
                Update
              </button>
              <button
                onClick={() => deletePost(Number(post.id))}
                className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
              >
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
