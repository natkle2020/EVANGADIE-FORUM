import React from "react";
import "./About.css";
function About() {
  return (
    <>
      <div class="navbar">
        <div class="nav-links">
          <a href="#">Home</a>

          <a href="#">How it Works</a>
        </div>
        <div>
          <button class="sign-in-button">Sign In</button>
        </div>
      </div>
      <div class="container">
        <h2> ABOUT US</h2>
        <p>
          Rather than presenting you just the usual corporate overview, I'd like
          to share the story behind Evangadi's inception and the commitment we
          hold to our clients.
        </p>
        <p>
          {" "}
          My name is Adugna Bekele, the founder of this development shop. Prior
          to founding Evangadi, I used to work as a senior software engineer
          taking parts in various projects in the US. For your reference, I've
          listed some of these projects below. In 2016, I embraced the challenge
          of founding my own agency, with the goal of offering direct services
          to clients. Now, with over eight years in our experience, we are a
          dedicated team of highly proficient software engineers, collaborating
          to provide top-tier solutions to our clients.
        </p>
        <p>
          {" "}
          Our pledge to you is transparency, integrity, and relentless effort.
          We are always at your service, ready to address your queries and offer
          the most effective solutions tailored to your needs.
        </p>

        <button class="how-it-works-button"> HOW IT WORKS </button>
      </div>
    </>
  );
}

export default About;
