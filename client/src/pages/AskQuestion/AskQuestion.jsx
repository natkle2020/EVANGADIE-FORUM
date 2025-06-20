import React, { useState } from "react";
import styles from "./AskQuestion.module.css";
import axios from "../../utils/axios";

function AskQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(null);

  const handlePostQuestion = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setPostError("Title is required.");
      return;
    }
    if (!description.trim()) {
      setPostError("Description is required.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setPostError("You must be logged in to post a question.");

      // Clear error message after 5 seconds
      setTimeout(() => {
        setPostError(null);
      }, 5000);
      return;
    }
    setPosting(true);
    setPostError(null);
    setPostSuccess(null);
    try {
      await axios.post(
        "/questions",
        {
          title: title,
          description: description,
          tag: tag,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPostSuccess("Question posted successfully!");

      // Clearing success message after 4 seconds
      setTimeout(() => {
        setPostSuccess(null);
      }, 4000);

      setTitle("");
      setDescription("");
      setTag("");
    } catch (err) {
      console.log(err);
      setPostError(err.response?.data?.message || "Failed to post question.");

      // Clear error message after 5 seconds
      setTimeout(() => {
        setPostError(null);
      }, 5000);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className={styles.ask_container}>
      <div className={styles.postQuestionContainer}>
        <div className={styles.steps}>
          <h1>Steps to write a good question</h1>
          <ul>
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>
        <h1>Post Your Question</h1>
        <form className={styles.postQuestionForm} onSubmit={handlePostQuestion}>
          <label>
            Title<span className={styles.required}>*</span>:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter question title"
              disabled={posting}
            />
          </label>

          <label>
            Description
            <span className={styles.required}>*</span>:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide more context or details..."
              rows={4}
              disabled={posting}
            />
          </label>

          <label>
            Tag:
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className={styles.selectbox}
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

          <button type="submit" disabled={posting}>
            {posting ? "Posting..." : "Post Question"}
          </button>
          {postError && <p className={styles.error}>{postError}</p>}
          {postSuccess && <p className={styles.success}>{postSuccess}</p>}
        </form>
      </div>
    </div>
  );
}

export default AskQuestion;
