import React, { useState } from "react";
import styles from "./PostQuestion.module.css";
import axiosInstance from "../../utils/Api";

const PostQuestion = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(null);

  const handlePostQuestion = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !description.trim()) {
      setPostError("Title, Question, and Description are required.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setPostError("You must be logged in to post a question.");
      return;
    }

    setPosting(true);
    setPostError(null);
    setPostSuccess(null);

    try {
      await axiosInstance.post(
        "/questions",
        { title, question: content, description, tag },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPostSuccess("Question posted successfully!");
      setTitle("");
      setContent("");
      setDescription("");
      setTag("");
    } catch (err) {
      setPostError(err.response?.data?.message || "Failed to post question.");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className={styles.postQuestionContainer}>
      <section className={styles.instructions}>
        <h2>Steps To Write A Good Question</h2>
        <ul>
          <li>Summarize your problem in a one-line title</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it here.</li>
        </ul>
      </section>
      <h1>Post Your Question</h1>
      <form className={styles.postQuestionForm} onSubmit={handlePostQuestion}>
        <label>
          Title<span className={styles.required}>*</span>:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter question title"
            required
            disabled={posting}
          />
        </label>

        <label>
          Question<span className={styles.required}>*</span>:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your main question..."
            rows={4}
            required
            disabled={posting}
          />
        </label>

        <label>
          Description<span className={styles.required}>*</span>:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide more context or details..."
            rows={4}
            required
            disabled={posting}
          />
        </label>

        <label>
          Tag:
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="e.g. javascript, react, nodejs"
            disabled={posting}
          />
        </label>

        <button type="submit" disabled={posting}>
          {posting ? "Posting..." : "Post Question"}
        </button>

        {postError && <p className={styles.error}>{postError}</p>}
        {postSuccess && <p className={styles.success}>{postSuccess}</p>}
      </form>
    </div>
  );
};

export default PostQuestion;