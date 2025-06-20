import React, { useEffect, useState } from "react";
import classes from "./HomePage.module.css";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/formatter";
import { Button, Spinner } from "react-bootstrap";

function HomePage() {
  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/questions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(response?.data?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const questionsToShow = filteredQuestions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <Spinner animation="border" variant="warning" />
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
        <div className={classes.searchContainer}>
          <input
            type="text"
            placeholder="Search questions..."
            className={classes.searchInput}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to page 1 on new search
            }}
          />
        </div>

        {/* <h2>Questions</h2> */}
        <div className={classes.headerRow}>
          <h2>Questions</h2>
          {totalPages > 1 && (
            <div className={classes.pagination}>
              <Button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={classes.paginationButton}
              >
                Previous
              </Button>
              <span className={classes.pageInfo}>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={classes.paginationButton}
              >
                Next
              </Button>
            </div>
          )}
        </div>

        <div className={classes.questions}>
          {questionsToShow.map((item) => {
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
                </Link>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
      </div>
    </div>
  );
}

export default HomePage;
