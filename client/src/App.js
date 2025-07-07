import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

// 🔗 Hardcoded Render backend URL
const API_BASE_URL = "https://movie-review-hub-8yji.onrender.com";

function App() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ title: "", review: "", rating: 1 });

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/reviews`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to fetch reviews:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/reviews`, form);
      setForm({ title: "", review: "", rating: 1 });
      const res = await axios.get(`${API_BASE_URL}/api/reviews`);
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  return (
    <div>
      <h1>🎬 MovieReviewHub</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Movie Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Your Review"
          value={form.review}
          onChange={(e) => setForm({ ...form, review: e.target.value })}
        />
        <input
          type="number"
          min="1"
          max="5"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {reviews.map((r, i) => (
          <li key={i}>
            <strong>{r.title}</strong> - {r.review} ⭐{r.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
