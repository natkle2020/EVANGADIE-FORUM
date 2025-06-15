import React, { useEffect, useState } from "react";
import classes from "./HomePage.module.css";
import axios from "../../utils/axios";
import { useContext } from "react";
import { Context } from "../../Components/Context";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/formatter";
import { Button, Spinner } from "react-bootstrap";
function HomePage() {
  const [questions, setQuestions] = useState([]);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const [displayedQuestions, setDisplayedQuestions] = useState(5);
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/questions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response);
        setQuestions(response?.data?.data);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    })();
  }, []);


  //handling see more
  const seeMore = () => {
    setDisplayedQuestions((prevCount) => prevCount + 5); //Show the next 5
  };

  const seeLess = () => {
    setDisplayedQuestions(5);
    // Scroll to top when showing less
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get the questions to display based on the current limit
  const questionsToShow = questions.slice(0, displayedQuestions);




  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <Spinner animation="border" variant="warning" >
          {/* <p>Loading questions...</p> */}
        </Spinner>
      
      </div>
    );
  }


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
        <h2>Questions</h2>
        <div className={classes.questions}>
          <hr />
          {questionsToShow?.map((item) => {
            const favicon = item?.username[0].toUpperCase();
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
                  <hr />
                </Link>
              </div>
            );
          })}
        </div>

        {/* See More or See Less buttons */}
        {questions.length > 5 && (
          <div className={classes.see_more_container}>
            {displayedQuestions < questions.length && (
              <Button className={classes.see_more_button} onClick={seeMore}>
                See More ({questions.length - displayedQuestions} more)
              </Button>
            )}
            {displayedQuestions > 5 && (
              <Button className={classes.see_less_button} onClick={seeLess}>
                See Less
              </Button>
            )}
          </div>
        )}


      </div>
    </div>
  );
}

export default HomePage;
