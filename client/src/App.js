import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';


function App() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ title: "", review: "", rating: 1 });

  useEffect(() => {
    axios.get("http://localhost:5000/api/reviews").then(res => setReviews(res.data));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/reviews", form);
    setForm({ title: "", review: "", rating: 1 });
    const res = await axios.get("http://localhost:5000/api/reviews");
    setReviews(res.data);
  };

  return (
    <div>
      <h1>🎬 MovieReviewHub</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Movie Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
        <textarea placeholder="Your Review" value={form.review} onChange={e => setForm({...form, review: e.target.value})} />
        <input type="number" min="1" max="5" value={form.rating} onChange={e => setForm({...form, rating: e.target.value})} />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {reviews.map((r, i) => (
          <li key={i}><strong>{r.title}</strong> - {r.review} ⭐{r.rating}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
