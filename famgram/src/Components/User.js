import React from 'react'
import styled from "styled-components"
import { motion } from "framer-motion"
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';


function User({bio, username, imageUrl, userDocId}) {
  const history = useHistory();
  const profileHandler = () => {
    
    history.push(`/p/${userDocId}`)
  }

  return (
    <>
     <Header onClick={profileHandler}>
         <div className="header__avatar" >
         <Avatar alt={username} src={imageUrl}/>
         </div>
          <div className="header__info">
            <h5>{username}</h5>
            <p>{bio}</p>
          </div>      
       </Header>
      
    </>
  )
}
const Header = styled(motion.div)`
display: flex;
justify-content: flex-start;
align-items: center;
cursor: pointer;

@media(max-width: 650px){
   justify-content: flex-end;
   margin-top: .5rem;
 }

 .header__avatar{
  padding-left: .5rem;
  
}

 .header__info{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  @media(max-width: 650px){
    display: none;
 }  
  
   h5{
   font-size: 1.4rem;
   }

   p{
    color: black;
   }
 }
`
export default User
