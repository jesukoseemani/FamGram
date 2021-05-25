import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import ImageUpload from "./ImageUpload"
import { motion } from "framer-motion"
import Post from "./Post"
import Userlists from "./Userlists"
import { db } from "../firebase"

function Skeleton({user, userDetails}) {
  const [posts, setPosts] = useState([])


  useEffect(() => {
  db.collection('Posts')
  .orderBy('createdAt', 'desc')
  .onSnapshot((snapShot) => {
      setPosts(snapShot.docs.map((doc) => (
         {
           id: doc.id,
           post: doc.data()
         }

      )))
  })
  },[])
  

  return (
    <StyledSkeleton>
      
        <Rapper>
      <StyledPost>
      <ImageUpload username={user?.displayName} userId={user?.uid}userDetails={userDetails}/>
      {posts.map(({id, post}) => (
        <Post 
        key={id} 
        Pid={id} 
        user={user}
        username={post.username} 
        caption={post.caption} 
        imageUrl={post.imageUrl} 
        location={post.location}
        userId={post.userId}
        likeData={post.likes}
        createdAt={post.createdAt}
        userImageUrl={post.userImageUrl}
        userProfileId={post.userProfileId}
        />
      ))}

      </StyledPost>
    
      <StyledUser>
        <Userlists user={user} userDetails={userDetails} />
      </StyledUser>
      </Rapper>
    </StyledSkeleton>
  )
}

const StyledSkeleton = styled(motion.div)`
width:100%;
max-width: 1550px;
margin: 0 auto;
background-color: #fafafa;
`
const Rapper= styled(motion.div)`
display:flex;
justify-content: center;
align-items: flex-start;
width:100%;
padding: 2rem 14rem;
 @media(max-width: 1000px){
   padding: 2rem 5rem;
 }
 @media(max-width: 650px){
   padding: 2rem 2rem;
 }
 
`

const StyledPost =  styled(motion.div)`
/* flex:0.6; */
`
const StyledUser =  styled(motion.div)`
/* flex:0.4; */
padding-top: 3rem;
margin-left: 2rem;
position: sticky;
top: 7rem;
`

export default Skeleton
