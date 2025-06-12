import React, { useContext } from "react";
import styles from "./WelcomeBoard.module.css";
import { UserContext } from "../Contexts/UserContexts";
// import { AppState } from "../../App"; //From App.js if according to video + line 15 might trigger error unless "user?" is resolved


const WelcomeBoard = () => {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button className={styles.button}>Ask Question</button>
        <span className={styles.welcomeText}>
          Welcome: {user?.username || "Guest"}
        </span>
      </div>
      <h2 className={styles.heading}>Questions</h2>
      <hr className={styles.divider} />
    </div>
  );
};

export default WelcomeBoard;
