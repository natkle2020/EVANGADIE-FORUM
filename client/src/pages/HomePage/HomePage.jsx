import React, { useEffect, useState, useContext } from "react";
import classes from "./HomePage.module.css";
import axios from "../../utils/axios";
import { Context } from "../../Components/Context";
import { Link, useLocation } from "react-router-dom";
import { timeAgo } from "../../utils/formatter";

function HomePage() {
  const [questions, setQuestions] = useState([]);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const loggedInUserId = localStorage.getItem("user_id");
  const [{ user }] = useContext(Context);
  const location = useLocation();

  // Fetch questions
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/questions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(response?.data?.data || response?.data?.questions || []);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Show success message after edit
  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
      const timer = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  // Delete logic
  const confirmDelete = (question_id) => {
    setQuestionToDelete(question_id);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/questions/${questionToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions((prev) =>
        prev.filter((q) => q.question_id !== questionToDelete)
      );
      setQuestionToDelete(null);
    } catch (error) {
      alert("Failed to delete question.");
      setQuestionToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setQuestionToDelete(null);
  };

  const ConfirmModal = ({ message, onConfirm, onCancel }) => (
    <div
      className={classes.confirmModalBackdrop}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        className={classes.confirmModalContent}
        style={{
          backgroundColor: "white",
          padding: "20px 30px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          maxWidth: "400px",
          width: "90%",
          textAlign: "center",
        }}
      >
        <p>{message}</p>
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <button
            onClick={onCancel}
            style={{
              backgroundColor: "#ccc",
              border: "none",
              padding: "8px 16px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              backgroundColor: "#b00020",
              border: "none",
              padding: "8px 16px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "600",
              color: "white",
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={classes.homepage}>
      <div className={classes.head}>
        <Link to="/askquestion">
          <button>Ask Question</button>
        </Link>
        <div className={classes.user}>
          <p>Welcome: {username}</p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
            alt="User Icon"
          />
        </div>
      </div>

      <div className={classes.body}>
        {successMessage && (
          <div className={classes.successMessage}>{successMessage}</div>
        )}
        <h2>Questions</h2>
        <div className={classes.questions}>
          <hr />
          {questions?.map((item) => {
            const favicon = item?.username?.[0]?.toUpperCase();
            const isOwner = item?.user_id?.toString() === loggedInUserId;

            return (
              <div key={item.question_id}>
                <Link to={`/answer/${item.question_id}`}>
                  <div className={classes.single}>
                    <div className={classes.profile}>
                      <p className={classes.avatar}>{favicon}</p>
                      <span>{item.username}</span>
                    </div>
                    <div className={classes.title}>{item.title}</div>
                    <div className={classes.extra}>
                      <p>{timeAgo(item.time)}</p>
                    </div>
                  </div>
                </Link>

                {isOwner && (
                  <div className={classes.actionButtons}>
                    <Link to={`/editquestion/${item.question_id}`}>
                      <button className={classes.editBtn}>Edit</button>
                    </Link>
                    <button
                      className={classes.deleteBtn}
                      onClick={() => confirmDelete(item.question_id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
                <hr />
              </div>
            );
          })}
        </div>
      </div>

      {questionToDelete && (
        <ConfirmModal
          message="Are you sure you want to delete this question?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default HomePage;
