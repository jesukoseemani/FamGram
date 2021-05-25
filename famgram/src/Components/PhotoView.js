import React, {useState} from 'react';
import styled from "styled-components"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCommentDots, faHeart} from '@fortawesome/free-solid-svg-icons';

function PhotoView({imageUrl, username, likes, comment}) {
  const [hover, setHover] = useState(false)
  return (
    <StyledPv className="hover" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          
    <img style={{filter: hover ? "blur(10px)" : ""}} src={imageUrl} alt={username}  />
    
    <div className="hover_rapper">
    {hover && <>
      <div className="hover_icon">
      <FontAwesomeIcon 
   className="icons" 
   icon={faHeart} 
   size="1x"
    />{likes}
      </div>
      <div className="hover_icon">
      <FontAwesomeIcon 
   className="icons" 
   icon={faCommentDots} 
   style={{marginLeft: "2rem"}}
   size="1x"
    />{comment}
      </div>
      </>
      }
    </div>
   
    </StyledPv>
  );
}
const StyledPv = styled(motion.div)`
position:relative;
img{
  width:100%;
  height: 25rem;
  object-fit: cover;
  object-position: top;
  
  @media(max-width: 550px){
  /* object-fit:contain; */
  object-position: top;
 }
} 
  .hover_rapper{
  position:absolute;
  top:50%;
  left: 25%;
  right: 25%;
  display: flex;
  justify-content:space-between;
  align-items:center;
  /* width:40%; */
  margin:0 auto;
  }
  .hover_icon{
  display: flex;
  justify-content:center;
  align-items:center;
  color:white;
  z-index: 500;
    .icons{
      color:white;
      font-size: 2.2rem;
      padding-right:.3rem;
      z-index: 500;
      
    }
}

`
export default PhotoView;
