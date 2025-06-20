import React from "react";
import styles from "./QuestionList.module.css";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react"; //********************************npm install lucide-react

const QuestionItem = ({ question }) => {
  return (
    <a href={`/question/${question.question_id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.avatarSection}>
          <img
            src={`https://api.dicebear.com/8.x/identicon/svg?seed=${question.username}`} //******for free unique avatars based on user name */
            alt="avatar"
            className={styles.avatar}
          />
          <p className={styles.username}>{question.username}</p>
        </div>

        <div className={styles.contentSection}>
          <p className={styles.question}>
            {question.question.length > 150
              ? `${question.question.slice(0, 150)}...`
              : question.question}
          </p>
        </div>

        <div className={styles.iconSection}>
          <ChevronRight size={24} />
        </div>
      </div>
      <hr />
    </a>
  );
};

export default QuestionItem;