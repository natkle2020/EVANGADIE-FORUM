import React, { useEffect, useRef, useState } from 'react'
import axios from '../../utils/axios'
import classes from './Answer.module.css'
import { useParams } from 'react-router-dom'
// import { timeAgo } from '../../utils/formatter'

function Answer() {
    const {qid} =useParams()
    const [answer, setAnswer] = useState([])
    const [question, setQuestion] = useState([])
    const answerRef = useRef('')
    const token = localStorage.getItem('token')

    useEffect(()=>{
        (async()=>{
            try {
                const question_response = await axios.get(`/questions/${qid}`,{
                    headers:{Authorization : `Bearer ${token}`}
                })
                setQuestion(question_response.data.question)
                 const answer_response = await axios.get(`answers/${qid}`,{
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
           return alert('Please enter at least 6 character')
        }
        try {
           const ansewrPosted = await axios.post('/answers', {
                answer: answerValue,
                question_id : qid
            }, {
                    headers:{Authorization : `Bearer ${token}`}
                }
            )
            answerRef.current.value = ''
        } catch (error) {
            console.log(error)
        }
   }

  return (
    <div className={classes.main_container}>
        <div className={classes.container}>

        <div className={classes.question}>

      <h3 className={classes.title}>{question?.title}</h3>
      <p>Tag: {question?.data?.data?.tag}</p>
      <p>Asked By: {question?.asked_by?.first_name}</p>
      {/* <p>{timeAgo(question?.time)}</p> */}
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
