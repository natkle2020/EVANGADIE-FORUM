import React from 'react'
import styles from './AuthPage.module.css'
import {Link} from 'react-router-dom'
function About() {
  return (
    <div className={styles.sideinfo}>
        <p className={styles.aboutTag}>About</p>
        <h1>Evangadi Networks Q&A</h1>
        <p>
          No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.
        </p>
        <p>
         Whether you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.
        </p>
        <Link to="/howitwork">
            <button className={styles.howBtn}>HOW IT WORKS</button>
        </Link>
      </div>
  )
}

export default About
