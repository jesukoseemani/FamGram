import React, {useState, useEffect} from 'react';
import styled from "styled-components"
import { motion } from "framer-motion"
import {useLocation} from "react-router-dom"
import {useStyles , useStyles1, useStyles2} from "../styles/avatarStyles"
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Avatar from '@material-ui/core/Avatar';
import Header from "../Components/Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBell, faCommentDots, faHeart, faUserEdit, faPen } from '@fortawesome/free-solid-svg-icons';
import { faAngellist } from '@fortawesome/free-brands-svg-icons'
import { db , storage} from "../firebase"
import { CubeGrid } from 'better-react-spinkit'
import { v4 as uuidv4 } from "uuid";


function UserProfile({user}) {

  const classes = useStyles();
  const classes1 = useStyles1();
  const classes2 = useStyles2();
  const [hover, setHover] = useState(false)
  const [text, setText] = useState("")
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [image, setImage] = useState(null)
  const [profile, setProfile] = useState([])
  const [content, setContent] = useState([])
  const [progress, setProgress] = useState(0)



  const location = useLocation()
  const id = location.pathname.split("/")[2]

  const [userDetails,setUserDetails] = useState()
  useEffect(() => {
    
    if(user){
      db.collection("Users").where("userId", "==", user.uid)
      .onSnapshot((querySnapshot) => {
      setUserDetails(querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      })))
      
      })
      
     } 
    
    // userImage={userDetails.data.imageUrl} userDetails={userDetails}
   
  },[user])

 

  useEffect(() => {
    if(id){
      db.collection("Users").doc(id)
      .onSnapshot((doc) => {
        setProfile(doc.data()) 
      })
    }
  
  },[id])

  useEffect(() => {
    if(profile.userId){
      db.collection("Posts").where("userId", "==" , profile.userId)
      .onSnapshot((querySnapshot) => {
        setContent(querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
      }
      )))
       
       })
    }
   
    
  },[profile.userId])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const removePhotoHandler = () => {
    setOpen(false)
    db.collection("Users").doc(id).update({
      imageUrl: "",
    })

  }

  const textHandler = () => {
   return db.collection("Users").doc(id).update({
      bio: text,
    })
    .then(() => {
      setOpen1(false)
      setText("")
    })
    .catch((error) => console.log(error.message))
   
  }

  const handleChange = (e) => {

    if (e.target.files[0]) {
      if(e.target.files[0].type === "image/jpeg" ||
         e.target.files[0].type === "image/jpg" ||
         e.target.files[0].type === "image/png"
         ){
          setImage(e.target.files[0]);
        
         }
         else{
           e.target.value = ""
          
         }
    }else{
      setImage(null)
      
    }
  };

useEffect(() => {
  setOpen(false)

 if(image){  
  const uploadTask = storage.ref(`images/${image.name}${uuidv4()}`).put(image);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
     
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress)
    },
    (error) => {
      console.log(error);
      alert(error.message);

    },
    () => {
      
      storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then((url) => {
        
          db.collection("Users").doc(id).update({
            imageUrl: url
          });
         
          
        });
    }
  );
  setImage(null);
  
 }
  },[image, id])

  return (
    <>
      {/* <Sty>  */}
      <Header userDetails={userDetails} />
      {/* </Sty> */}
      <StyledProfile>
        <ProfileHeader>
        <div style={{position: "relative"}} className="profile_avatar" onClick={handleOpen}>
       
        <Avatar  alt={profile.username} src={profile.imageUrl} className={classes.largest} />
        {progress > 0 && progress <= 99 ? 
         <div style={{position: "absolute", top: "30%", left: "40%"}}>
         <CubeGrid size={30} color="blue"/>
        </div> : null
        } 
        <FontAwesomeIcon 
         className="icons" 
         icon={faUserEdit} 
         style={{marginTop: "-10rem", color: "#3B74AD"}}
         size="2x" />
        </div>

        <div className="profile_content">
          <div className="name">
          <h3>{profile.username}</h3>
          <FontAwesomeIcon 
         className="icons" 
         icon={faStar} 
         style={{paddingLeft: "0.5rem"}}
         size="3x" />
        <FontAwesomeIcon 
         className="icons" 
         icon={faAngellist}
         style={{color: "black"}}
         size="3x" />
          </div>

        <h6>{profile.fullname}</h6>
        <p><strong>{content.length}</strong> posts</p>
        <p style={{fontWeight: "500", color: "#3B74AD"}}>{profile.bio === "" ? "WELCOME TO FAMGRAM..Join us on a Smooth Ride!!" : profile.bio}
        <FontAwesomeIcon  
         icon={faPen} 
         style={{paddingLeft: "1rem", color: "black", cursor: "pointer"}
        }
        onClick={handleOpen1}
         size="2x" />
        </p>
        </div>
        </ProfileHeader>
        <div className="line"></div>
        <ProfileInfo>
        <div className="info-head">
        <FontAwesomeIcon 
         className="icons" 
         icon={faBell}
        //  style={{color: "black"}}
         size="3x" />
         <h3>POSTS</h3>
        </div>

      <div className="info-content">
      {content.map(({data, id}) => (
                  <div key={id} style={{backgroundColor: hover ? "gray" : ""}}  className="hover" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          
                  <img src={data.imageUrl} alt={data.username}  />
                  
                  <div className="hover_rapper">
                  {hover && <>
                    <div className="hover_icon">
                    <FontAwesomeIcon 
                 className="icons" 
                 icon={faHeart} 
                 size="1x"
                  />{data.likes.length}
                    </div>
                    <div className="hover_icon">
                    <FontAwesomeIcon 
                 className="icons" 
                 icon={faCommentDots} 
                 style={{marginLeft: "2rem"}}
                 size="1x"
                  />{data.comment.length}
                    </div>
                    </>
                    }
                  </div>
                 
                  </div>
      ) 
        )}
         
        </div>
        </ProfileInfo>

        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes1.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes1.paper}>
            <div style={{display: "flex", justifyContent:"center",alignItems: "center", flexDirection:"column", margin: "0rem 4rem", textAlign: "center"}}>
            <h2 style={{padding: "1.3rem 0rem", borderBottom: "1px solid lightgray"}} id="transition-modal-title">Change Profile Photo</h2>
            
            <p style={{color: "#3B74AD", cursor:"pointer"}} className={classes1.layout} id="transition-modal-description"
            >
              <label style={{cursor:"pointer"}} htmlFor="file">Upload Photo</label>
              <input type="file" name="file" id="file" accept="image/png,image/jpg,image/jpeg" 
               onChange={handleChange} hidden/>
            </p>
            
            <p style={{color: "red", cursor:"pointer"}} className={classes1.layout} id="transition-modal-description"
            onClick={removePhotoHandler}>
              Remove Current Photo
            </p>
            <p style={{borderBottom: "none", cursor:"pointer"}} className={classes1.layout} id="transition-modal-description"
            onClick={handleClose}>
              Cancel
            </p>
            </div>
           
          </div>
        </Fade>
      </Modal>


      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes2.modal}
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open1}>
          <div className={classes2.paper} >
            <div className={classes2.layout}>
            <textarea className="textarea" style={{padding: ".5rem .5rem", color: "black", fontSize:"1.2rem"}} type="text" value={text} rows="5" cols="28" placeHolder="Something about you" onChange={(e) => 
            setText(e.target.value)}></textarea>
            
            <input className="textButton" style={{marginTop: "1rem", padding: "1rem 1rem", backgroundColor:"#3B74AD", color: "white", outline: "none", borderRadius: "3rem", border: "none", cursor: "pointer"}} value="Click Now" type="button" onClick={textHandler} />  
          
            </div>
          </div>
        </Fade>
      </Modal>
      </StyledProfile>
      
      
      
    
    </>
  );
}

// const Sty = styled.div`
// width: 100%;
// background-color: white;
// margin: 0 auto;
// `

const StyledProfile = styled(motion.div)`
width:100%;
max-width: 1550px;
margin: 0 auto;
padding: 2rem 14rem;
@media(max-width: 1200px){
   padding: 2rem 5rem;
 }
 @media(max-width: 850px){
   padding: 2rem 1rem;
 }
 

.line{
  border: 1px solid #3B74AD;
  margin-top: 3rem;
  text-align: center;
}

`
const ProfileHeader = styled(motion.div)`
display:flex;
justify-content: flex-start;
margin:2rem;
@media(max-width: 460px){
      flex-direction: column;
      justify-content: center;
      align-items: center;
     }
.profile_avatar{
margin-left: 6rem;
cursor: pointer;
.icons{
  @media(max-width: 600px){
      font-size: 2rem;
     }
}
@media(max-width: 850px){
    margin-left: 3rem;
 }
 @media(max-width: 480px){
    margin-left: .5rem;
 }
}
.profile_content{
  margin-left: 10rem;
  display:flex;
  justify-content: center;
  /* align-items:center; */
  flex-direction:column;
  @media(max-width: 850px){
    margin-left: 3rem;
 }
 @media(max-width: 460px){
      align-items: center;
      margin-top: 1rem;
     }
   .name{
    display:flex;
    justify-content: flex-start;
    align-items:center;
    
     h3{
    font-size: 2.2rem;
    @media(max-width: 600px){
      font-size: 1.7rem;
     }
     @media(max-width: 460px){
      font-size: 1.9rem;
     }
     }
    .icons{
    color: #3b74ad;
    @media(max-width: 600px){
      font-size: 2rem;
     }
    }
   }
   
   h6{
  font-size: 1rem;
  font-style: italic;
  margin-bottom:2rem;
  @media(max-width: 600px){
      font-size: .8rem;
     }
   }
   p{
    font-size: 1.2rem;
    margin-bottom:2rem;
    @media(max-width: 600px){
      font-size: 1.15rem;
     }
     @media(max-width: 460px){
      font-size: 1rem;
      text-align: center;
     }
   }
}
`

const ProfileInfo = styled(motion.div)`

.info-head{
  display: flex;
  justify-content:center;
  align-items:center;
  margin:3rem;
  h3{
font-size:2rem;
  }
  .icons{
padding-right:.5rem;
  }
}

.info-content{
display:grid;
grid-template-columns: repeat(3, 1fr);
grid-gap: 1rem;
margin: 0 1.5rem;
@media(max-width: 850px){
  grid-template-columns: repeat(2, 1fr);
 }

img{
  width:100%;
  height: 25rem;
  object-fit:cover;
}

.hover{
  position:relative;
  
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
    .icons{
      color:white;
      font-size: 2.2rem;
      padding-right:.3rem;
    }
  }
}
}
`


export default UserProfile;
