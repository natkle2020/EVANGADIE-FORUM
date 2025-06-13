import React, { useEffect, useState } from 'react'
import classes from './HomePage.module.css'
import axios from '../../utils/axios'
import { useContext } from 'react'
import { Context } from '../../Components/Context'
import {Link} from 'react-router-dom'
import { timeAgo } from '../../utils/formatter'
function HomePage() {
    const[questions, setQuestions] = useState([])
    const username = localStorage.getItem('username')
    const token = localStorage.getItem('token')
    const[{user}, dispatch] =useContext(Context)

    useEffect(()=>{
        (async()=>{
            try {
                const response = await axios.get('/questions',{
                    headers :{Authorization : `Bearer ${token}`}
                })
                console.log(response)
                setQuestions(response?.data?.data)
            } catch (error) {
                console.log(error)
            }
        })()
    },[])
  return (
    <div className={classes.homepage}>
      <div className={classes.head}>
        <Link to="/askquestion">
        <button>Ask Question</button>
        </Link>
        <div className={classes.user}>
        <p>Welcome: {username}</p>
        <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="User Icon" />
        </div>
      </div>
      <div className={classes.body}>
        <h2>Questions</h2>
        <div className={classes.questions}>
            <hr />
            {
                questions?.map(item => {
                    const favicon = item?.username[0].toUpperCase()
                    return( 

                        <div key={item.question_id}>
                          <Link to={`/answer/${item.question_id}`}>
                         <div className={classes.single}>
                            <div className={classes.profile}><p className={classes.avatar}>{favicon}</p> <span>{item.username}</span></div>
                            <div className={classes.title}>{item.title}</div>
                            <div className={classes.extra}><p>{timeAgo(item.time)}</p></div>
                        </div>
                        <hr />
                          </Link>
                        </div>
                    )
                })
            }
        </div>
      </div>
    </div>
  )
}

export default HomePage
