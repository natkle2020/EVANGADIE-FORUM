import React, { useEffect, useState } from 'react'
import classes from './HomePage.module.css'
import axios from 'axios'
function HomePage() {
    const[questions, setQuestions] = useState([])
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFiZWwiLCJ1c2VyX2lkIjoyLCJpYXQiOjE3NDk3NDQ4OTIsImV4cCI6MTc0OTgzMTI5Mn0.FwHZNDS_spX_RROLhPxJ7iioo26SuQytUyIfj70oacI'

    useEffect(()=>{
        (async()=>{
            try {
                const response = await axios.get('http://localhost:4000/api/questions/',{
                    headers :{Authorization : `Bearer ${token}`}
                })
                setQuestions(response.data.data)
            } catch (error) {
                console.log(error)
            }
        })()
    },[])
  return (
    <div className={classes.homepage}>
      <div className={classes.head}>
        <button>Ask Question</button>
        <div className={classes.user}>
        <p>Welcome: User</p>
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
                         <div className={classes.single}>
                            <div className={classes.profile}><p className={classes.avatar}>{favicon}</p> <span>{item.username}</span></div>
                            <div className={classes.title}>{item.title}</div>
                            <div className={classes.extra}><img src="https://static-00.iconduck.com/assets.00/like-icon-2048x1676-wjkvm94s.png" alt="Like Icon" /></div>
                        </div>
                        <hr />
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
