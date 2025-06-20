import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import classes from "./EditQuestion.module.css";

const EditQuestion = () => {
  const { question_id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const res = await axios.get(`/questions/${question_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const q = res.data.question;
        setTitle(q.title);
        setDescription(q.description);
        setTag(q.tag || "");
        setLoading(false);
      } catch (err) {
        alert("Failed to load question.");
        navigate("/");
      }
    }

    fetchQuestion();
  }, [question_id, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(
        `/questions/${question_id}`,
        {
          title,
          description,
          tag,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccessMessage("Question updated successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);

    } catch (err) {
      console.error(err);
      alert("Failed to update question.");
    }
  };
  

  if (loading) return <p>Loading question data...</p>;

  return (
    <div className={classes.editWrapper}>
      <h2>Edit Your Question</h2>
      <form onSubmit={handleSubmit} className={classes.form}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter question title"
          required
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide more context or details..."
          rows={4}
          required
        />

        <label>
          Tag:
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            name="tag"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="csharp">C#</option>
            <option value="c++">C++</option>
            <option value="php">PHP</option>
            <option value="go">Go (Golang)</option>
            <option value="typescript">TypeScript</option>
            <option value="ruby">Ruby</option>
            <option value="swift">Swift</option>
            <option value="react">React</option>
            <option value="vue">Vue.js</option>
            <option value="nodejs">Node.js</option>
            <option value="express">Express.js</option>
            <option value="nextjs">Next.js</option>
            <option value="django">Django</option>
            <option value="laravel">Laravel</option>
            <option value="mongodb">MongoDB</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="devops">DevOps</option>
          </select>
        </label>

        <button type="submit" className={classes.saveBtn}>
          Save Changes
        </button>
      </form>
      {successMessage && (
        <div className={classes.successMessage}>{successMessage}</div>
      )}
    </div>
  );
};

export default EditQuestion;
