import React from 'react'
import styled from "styled-components"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignOutAlt, faEllipsisV, faTimes} from '@fortawesome/free-solid-svg-icons';
import Avatar from "@material-ui/core/Avatar";
import logo from "../img/famgram.svg";
import { auth } from "../firebase"
import {useHistory} from "react-router-dom"

function Header({userDetails, openUL, run}) {
 const history = useHistory()
 const history1 = useHistory()
 const history2 = useHistory()
 
   const signUserOut = () => {
     auth.signOut();

     history.push("/login")
   }

   const GotoHome = () => {

    history1.push("/")
  }

  const clickProfile = () => {

    history2.push(`/p/${userDetails[0].id}`)
  }
  return (
    <StyledHeader>
    
    <Rapper>
    <Logo>
      <img onClick={GotoHome} src={logo} alt="logo"/>
    </Logo>
    
    <StyledIcons>
    <FontAwesomeIcon className="icons" icon={faHome} size="2x" aria-hidden="true" title="Home" onClick={GotoHome}/>
    <FontAwesomeIcon className="icony" icon={faSignOutAlt} size="2x" aria-hidden="true" title="SignOut" onClick= {signUserOut} />
    {userDetails && 
    <Avatar
          className="post__avatar"
          alt= {userDetails[0].data.username}
          src={userDetails[0].data.imageUrl}
          onClick={clickProfile}        
        />
    }
    <FontAwesomeIcon style={{visibility: openUL === true ? "hidden" : ""}} className="open" icon={faEllipsisV} size="2x" aria-hidden="true" title="open" onClick={() => run()}/>

    <FontAwesomeIcon style={{display: openUL !== true ? "none" : ""}}  className="close" icon={faTimes} size="2x" aria-hidden="true" title="close" onClick={() => run()}/>
    </StyledIcons>
   
    </Rapper>

    </StyledHeader>
  )
}

const StyledHeader = styled(motion.div)`
 background-color: white;
 position: sticky;
 top: 0;
 z-index: 100;
`

const Rapper = styled(motion.div)`
 display: flex;
 justify-content: space-between;
 align-items: center;
 width:100%;
 padding: 1rem 13rem;
 margin: 0 auto;
 max-width: 1350px;
 @media(max-width: 1000px){
  padding: 1rem 5rem;
 }
 @media(max-width: 600px){
  padding: 1rem 1rem;
 }
` 

const Logo = styled(motion.div)`
/* flex-basis: 20%; */
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;


img{
  width:10rem;
  height:4rem;
  object-fit: contain;
  @media(max-width: 600px){
    width:8rem;
 }
}
`
const StyledIcons = styled(motion.div)`
 display: flex;
 justify-content: center;
 align-items: center;
 /* flex-basis: 20%; */
 .close{
   color: red;
   display: none;
   margin-left:3rem;
   @media(max-width: 950px){
     display: flex;
     font-size:2.3rem;
     margin-left:2.5rem;
 }
 }

 .open{
   display: none;
   @media(max-width: 950px){
     display: flex;
     font-size:1.8rem;
     margin-left:2.5rem;
 }
 }
 
 .icony{
  margin-left:3rem;
  @media(max-width: 950px){
     margin-left:1rem;
 }
 }
 .icons{
   margin-left:3rem;
   cursor: pointer;
   @media(max-width: 950px){
     display: none;
 }
   @media(max-width: 600px){
    font-size:1.8rem;
    margin-left:1.5rem;
 }
 }
 .post__avatar{
  margin-left:3rem;
  cursor: pointer;
  @media(max-width: 950px){
     display: none;
 }
 }
`


export default Header
