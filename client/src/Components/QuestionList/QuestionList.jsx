import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/Api";
import QuestionItem from "./QuestionItem";
import styles from "./QuestionList.module.css";

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axiosInstance.get("/questions/"); 
        setQuestions(res.data.data);
        console.log("res.data:", res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <p>Loading questions...</p>;

  return (
    <div className={styles.container}>
      {questions.map((q) => (
        <QuestionItem key={q.question_id} question={q} />
      ))}
    </div>
  );
};

export default QuestionsList;
