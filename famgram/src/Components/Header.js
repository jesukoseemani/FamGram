import React from 'react'
import styled from "styled-components"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Avatar from "@material-ui/core/Avatar";
import logo from "../img/famgram.svg";
import { auth } from "../firebase"
import {useHistory} from "react-router-dom"

function Header({userDetails}) {
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
      <img src={logo} alt="logo"/>
    </Logo>
    
    <StyledIcons>
    <FontAwesomeIcon className="icons" icon={faHome} size="2x" aria-hidden="true" title="Home" onClick={GotoHome}/>
    <FontAwesomeIcon className="icons" icon={faSignOutAlt} size="2x" aria-hidden="true" title="SignOut" onClick= {signUserOut} />
    {userDetails && 
    <Avatar
          className="post__avatar"
          alt= {userDetails[0].data.username}
          src={userDetails[0].data.imageUrl}
          onClick={clickProfile}        
        />
    }
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
 .icons{
   margin-left:3rem;
   cursor: pointer;
   @media(max-width: 600px){
    font-size:1.8rem;
    margin-left:1.5rem;
 }
 }
 .post__avatar{
  margin-left:3rem;
  cursor: pointer;
 }
`


export default Header
