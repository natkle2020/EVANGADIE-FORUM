import React from "react";
import QuestionList from "../../components/QuestionList/QuestionList";
import WelcomeBoard from "../../components/WelcomeBoard/WelcomeBoard";

function HomePage() {
  return (
    <>
      <WelcomeBoard />
      <QuestionList />
    </>
  );
}

export default HomePage;
