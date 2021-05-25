import React, {useState, useEffect} from 'react';
import { db } from "../firebase";
import firebase from "firebase";
import styled from "styled-components";
import { motion } from "framer-motion";
import {useStyles} from "../styles/avatarStyles";
import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from "uuid";
import TimeAgo from 'timeago-react';
import { useHistory } from 'react-router-dom';
import "./Post.css"


function Post({Pid, username, caption, imageUrl, location, userId, user, likeData, createdAt, userImageUrl, userProfileId}) {
  const classes = useStyles();
  const [like, setLike] = useState(false)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])
  const [length, setLength] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const history = useHistory()
  
  const toProfile = () => {

    history.push(`/p/${userProfileId}`)
  
  }

  useEffect(() => {
    
    const unsubscribe = db
        .collection("Posts")
        .doc(Pid)
        .collection("Comments")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    
    
    return () => {
      unsubscribe();
    };
  }, [Pid]);
 
 
  useEffect(() => {
    if(user){
    likeData.map((id) => id === user.uid ? setLike(true) : setLike(false))
    }

  }, [user, likeData])

  
  
  const clickHandler = () => {
   setLike(!like)
   
   if(like !== true){
    db.collection('Posts').doc(Pid)
    .update({
     likes: firebase.firestore.FieldValue.arrayUnion(user.uid),
     })
    
   }else{
    db.collection('Posts').doc(Pid)
    .update({
     likes: firebase.firestore.FieldValue.arrayRemove(user.uid),
     })
  
   }
  }

  const submitComment = (event) => {
    event.preventDefault();
    db.collection("Posts").doc(Pid).collection("Comments").add({
      text: comment,
      username: user.displayName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      id: uuidv4(),
    });
    db.collection("Posts").doc(Pid).update({
      comment: firebase.firestore.FieldValue.arrayUnion(user.displayName)   
    })
    setComment("");
  };
  
  
 
  return (

    <PostStyle>
       
       <Header style={{cursor: "pointer"}} onClick={toProfile}>
         <div className="header__avatar">
         <Avatar alt={username} src={userImageUrl}/>
         </div>
          <div className="header__info">
            <h5>{username}</h5>
            <p>{location ? location : "Location"}</p>
          </div>      
       </Header>
       
       <div className="picture" onDoubleClick={clickHandler}>
        <img src={imageUrl} alt="postImage"/>
        <FontAwesomeIcon 
         className="iconBig"
         icon={faHeart} 
         size="10x"
         style={{opacity: like ? "1" : "0",
                 animation: like ? "2s likeAnimation ease-in-out forwards" : "" }}
          />
       </div>
       
       <Footer>
         <div className="footer__icons">

         <FontAwesomeIcon 
         className="icons" 
         icon={faHeart} 
         style= {{color: like ? "#FF0000": "white",
                  stroke: like ? "#FF0000": "gray",
                }}
         size="2x"
         onClick={clickHandler} />

         <FontAwesomeIcon 
         className="icons" 
         icon={faCommentDots} 
         size="2x"
         onClick={() => setShowComment(!showComment)} />
         </div>

         <div className="footer__like">
           {likeData && 
            <p><span className="like-number"><strong>{likeData.length}</strong></span>&nbsp;&nbsp;{likeData.length === 1 ? 'like' : 'likes'}</p>
           }
         
         </div>
          {caption && <div className="footer__caption">
          <div className="footer__caption-top">
          <Avatar alt={username} src={userImageUrl} className={classes.small} />
          <p> {username} </p>
          </div>
          <div className="footer__caption-bottom">
            {caption}
          </div>
         </div>}
         
        <div className="post__comments">
          
          {comments.length >= 3 && 
          <p className="post__p" onClick={() => setLength(!length)}>View all {comments.length} comments</p>
          }
          
          {length === true ? comments.map((comment) => (
          <p key={comment.id}>
            <strong>{comment.username}: </strong>
            {comment.text}
          </p>
        )):
        comments.slice(0,3).map((comment) => (
          <p key={comment.id}>
            <strong>{comment.username}: </strong>
            {comment.text}
          </p>
        ))
        }
        </div>
       
        <div style={{margin: "0rem 0rem 1rem 2rem",}}>
        <TimeAgo datetime={createdAt}/>
        </div>
        
         { showComment && 
        <form className="form">
        <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" placeholder="Add a comment ..."/>

        <input type="submit" disabled={!comment} value="Post" onClick={submitComment}/>
        </form>
         }
       
       </Footer>

    </PostStyle>
  )
}

const PostStyle = styled(motion.div)`
/* display: flex;
justify-content: center;
align-items: center;
flex-direction: column; */
max-width: 55rem;
background-color: white;
  border: 1px solid lightgray;
  margin-bottom: 2.5rem;
  color: gray;

`
const Header = styled(motion.div)`
display: flex;
justify-content: flex-start;
align-items: center;
border-bottom: 1px solid lightgray;


 .header__avatar{
  padding-left: .5rem
}

 .header__info{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin-left: .4rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  
  
   h5{
   font-size: 1.4rem;
   color:black;
  font-weight: 500;
   }
 }
`
// const Picture = styled(motion.div)`
// width: 100%;
// position:relative;
// display: flex;
// align-items: center;
// justify-content: center;
// flex-direction: column;
// img{
//  width:100%;
//  object-fit: contain;
//  cursor: pointer;
// }
// .iconBig{
//   position: absolute;
//   display: inline-block;
//   opacity: 0;
//   color: red;
// }

// `
const Footer = styled(motion.div)`
display: flex;
justify-content: center;
align-items: flex-start;
flex-direction: column;

.footer__icons{
display: flex;
justify-content: flex-start;
align-items: center;
margin-top: 1rem;
  .icons{
   margin-left: 2rem;
   font-size: 2.7rem;
   color: white;
   stroke: gray;
   stroke-width: 3rem;
   cursor: pointer;
   @media(max-width: 650px){
    font-size: 2rem;
    margin-left: .8rem;
 }
  }
}

.footer__like{
 margin-left: 2rem;
 margin-top:1rem;
 @media(max-width: 650px){
    margin-left: .8rem;
 }
 .like-number{
  color: black;
 }
  p{
   font-size: 1.65rem;
   @media(max-width: 650px){
    font-size: 1.3rem;
 }
  }
}

.footer__caption{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2rem;
  margin-top: 1rem;
  @media(max-width: 650px){
    margin-left: .8rem;
 }
  .footer__caption-top{
    display: flex;
    justify-content: center;
    align-items: center;
    p{
    margin-left: .1rem;
    font-size: 1.1rem;
    font-weight: bold;
    color: black;
    @media(max-width: 650px){
    font-size: .8rem;
 }
    }
  }

  .footer__caption-bottom{
   margin-left: 1.2rem;
   display:flex;
   justify-content: center;
    align-items: center;
   color: black;
   font-size: 1.2rem;
   @media(max-width: 650px){
    font-size: .8rem;
 }
  }

 
}
.post__comments {
  margin-left: 2rem;
  margin-top: .5rem;
  margin-bottom: 1rem;
  color: black;
  @media(max-width: 650px){
    margin-left: .8rem;
 }
  p{
    padding-top:.5rem;
    font-size:1.1rem;
    @media(max-width: 650px){
    font-size: .8rem;
 }
  }
  .post__p{
    color: #3b74ad
  }
}

  .form{
  width: 100%;
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid lightgray;  
  input{
  border: none;
  outline: none;
  padding: 1rem .5rem; 
    }

input[type = text]{
 flex:1;
    }

input[type = submit]{
  width: 4rem;
  color: #3b74ad;
    }
  }
`

// const Anim = keyframes`
//   0%
//   {
//     transform: scale( .75 );
//   }
//   20%
//   {
//     transform: scale( 1.1 );
//   }
//   40%
//   {
//     transform: scale( .75 );
//   }
//   60%
//   {
//     transform: scale( 1.1 );
//   }
//   80%
//   {
//     transform: scale( .75 );
//   }
//   100%
//   {
//     transform: scale( .75 );
//   }
// `

export default Post
