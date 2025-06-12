import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import classes from './Answer.module.css'

function Answer() {
    const [answer, setAnswer] = useState([])
    const [question, setQuestion] = useState([])
    const answerRef = useRef('')
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkBsaWxraW1iZXIiLCJ1c2VyX2lkIjoyLCJpYXQiOjE3NDk3NTMzNzAsImV4cCI6MTc0OTgzOTc3MH0.wegzTLMPKQYxv3nwUcyQQCIxiJFka4oK6uHjsiSaYis'

    useEffect(()=>{
        (async()=>{
            try {
                const question_response = await axios.get('http://localhost:5000/api/questions/2',{
                    headers:{Authorization : `Bearer ${token}`}
                })
                setQuestion(question_response.data.question)
                 const answer_response = await axios.get('http://localhost:5000/api/answers/2',{
                    headers:{Authorization : `Bearer ${token}`}
                })
                setAnswer(answer_response.data.Answer)
            } catch (error) {
                console.log(error)
            }
        })()
       
    },[postAnswer])
   async function postAnswer(e) {
        e.preventDefault()
        const answerValue = answerRef.current.value
        if(answerValue.length < 5){
           return alert('Please enter atleast 6 character')
        }
        try {
           const ansewrPosted = await axios.post('http://localhost:5000/api/answers/', {
                answer: answerValue,
                question_id : 2
            }, {
                    headers:{Authorization : `Bearer ${token}`}
                }
            )
            answerRef.current.value = ''
            alert(ansewrPosted.data.message)
        } catch (error) {
            console.log(error)
        }
   }
  return (
    <div className={classes.main_container}>
        <div className={classes.container}>

        <div className={classes.question}>

      <h3 className={classes.title}>{question?.title}</h3>
      <p>Tag: {question?.tag}</p>
      <p>Asked By: {question?.asked_by?.first_name}</p>
      <p>{question?.description}</p>
        </div>
      <div className={classes.answer}>
        <h3>Recent Answers</h3>
        <div className={classes.answer_list}>
            {
                answer.map(item => {
                    const icon = item.username[0].toUpperCase()
                    return(
                        <div key={item.answer_id}>
                        <div className={classes.single_answer} >
                             <div className={classes.profile}>
                                <div className={classes.avatar}>{icon}</div>
                                <span>{item.username}</span>
                            </div>
                            <p>{item.answer}</p>
                         </div>
                         <hr />
                        </div>
                    )
                }
                )
            }
        </div>
      </div>
      <div className={classes.post_answer}>
        <h3 className={classes.title}>Answer this question</h3>
        <form onSubmit={postAnswer}>
            <textarea ref={answerRef} placeholder='Describe your answer here!'></textarea>
            <button  type='submit'>Post Answer</button>
        </form>
      </div>
            </div>
    </div>
  )
}

export default Answer
