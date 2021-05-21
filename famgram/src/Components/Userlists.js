import React, {useState, useEffect} from 'react'
import styled from "styled-components"
import { motion } from "framer-motion"
import User from "./User"
import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { db } from "../firebase"
import { useHistory } from 'react-router-dom';

function Userlists({user, userDetails}) {

  const [users, setUsers] = useState([])
  const history = useHistory()

  const profileHandler = () => {

    history.push(`/p/${userDetails[0].id}`)
  }

  useEffect(() => {
  
    if(user){
     db.collection("Users").where("userId", "!=", user.uid)
     .onSnapshot((querySnapshot) => {
      setUsers(querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
    })))
     
     })
    } 

   
   
  },[user])

  
   
 
  return (
    <StyledUserlist>
      {userDetails &&
       
       <Header onClick={profileHandler}>
         <div className="header__avatar">
         <Avatar alt={userDetails[0].data.username} src={userDetails[0].data.imageUrl}/>
         </div> 
        <div className="header__info" >
              <h5>{userDetails[0].data.username}</h5>
              <p>{userDetails[0].data.fullname}</p>
       </div>         
       </Header>
         
         }
       
       <Lists>
      <h2>All Family User</h2>
      <h3>Users</h3>
        {users?.map(({id, data}) => (
        <User key={id} userDocId={id} username={data.username} bio={data.bio} imageUrl={data.imageUrl} />
      ))}
      </Lists>
      <p className="customParagraph" style={{color: "#3d3da1", 
                 fontWeight: "bold",
                 marginTop:"7rem"
                 }}>
      THANK YOU FOR BEING PART OF THE FAMILY &nbsp;&nbsp;
      <FontAwesomeIcon 
         className="icons" 
         icon={faHeart} 
         size="1x" />
     </p>
    </StyledUserlist>
  )
}

const StyledUserlist = styled(motion.div)`
.customParagraph{
  @media(max-width: 650px){
   font-size:.9rem;
 } 
}
@media(max-width: 650px){
   width:6rem;
 } 
`
const Header = styled(motion.div)`
display: flex;
justify-content: flex-start;
align-items: center;

@media(max-width: 650px){
   justify-content: flex-end;
 }

 .header__avatar{
  padding-left: .5rem
}

 .header__info{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: .4rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  @media(max-width: 650px){
    display: none;
 }  
   h5{
   font-size: 1.4rem;
   }

   p{
    padding-left:1rem;
    color: black;
   }
 }
`

const Lists = styled(motion.div)`
margin-top: 2.5rem;
h3{
display: none;

@media(max-width: 650px){
   /* font-size: 1.2rem; */
   margin: .8rem;
   display: flex;
   justify-content: center;
  align-items: center;

 }
}
h2{
  margin: .8rem;
  
  @media(max-width: 650px){
   font-size: 1.2rem;
   display: none;
 }
}
`
export default Userlists;
