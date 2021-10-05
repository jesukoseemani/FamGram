import React, {useState, useEffect, useRef} from 'react'
import styled from "styled-components"
import { motion } from "framer-motion"
// import firebase from "firebase";
import { storage, db } from "../firebase";
import { v4 as uuidv4 } from "uuid";


function ImageUpload({username, userId, userDetails}) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [active, setActive] = useState(false)

  const ref = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
       setError("")
       setError1("")
       
     }, 4000);
     return () => clearTimeout(timer);
   },[error,setError,error1]);

  
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
           setError1("Please,the file must be in image Format(jpeg,jpg,png)")
         }
    }else{
      setImage(null)
     
    }
  };

  const handleUpload = () => {
    console.log(userDetails[0].id)
    setActive(true)
    let num = uuidv4();
    const uploadTask = storage.ref(`images/${num}/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
       
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
        setError(error.message)
      },
      () => {
        
        storage
          .ref("images")
          .child(num)
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
          
            db.collection("Posts").add({
              createdAt: new Date().toISOString(),
              caption: caption,
              imageUrl: url,
              location: location,
              username: username,
              userId: userId,
              likes:[],
              comment:[],
              userImageUrl: userDetails[0].data.imageUrl,
              userProfileId: userDetails[0].id
            });
            setProgress(0);
            setCaption("");
            setImage(null);
            setLocation("");
            ref.current.value = "";
            setActive(false)
          });
      }
    );
  };

  return (
    <StyledImageUpload>
    
      <progress className="progress" value= {progress} max="100" />

      ​<textarea 
      className="textarea" 
      rows="5" 
      placeholder="Enter a caption"
      onChange={(event) => setCaption(event.target.value)}
      value={caption}>

      </textarea>

      <input type="text" 
       className="loc"    
       placeholder="Location of the photo" 
       value={location}
       onChange={(event) => setLocation(event.target.value)}
      />
      
      <input type="file" ref={ref} className="file" onChange={handleChange} />

      <div style={{color: "red", 
                  textAlign: "center",
                  marginBottom:"1.5rem",
                  fontSize:"1.1rem",
                  fontStyle:"italics"}}> {error1}</div>
      
      <input disabled={!image || active} type="button" value="Upload" className="button" onClick={handleUpload} />

    </StyledImageUpload>
  )
}

const StyledImageUpload = styled(motion.div)`
 display: flex;
 flex-direction:column;
 justify-content: center;
 align-items: flex-start;
 width: 100%;

 .progress{
 width: 100%;
 padding-bottom: 1rem;
 }
 
 .textarea{
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem .5rem;
  font-size: 1.4rem;
}
 .loc{
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid gray;
  outline: none;
  border-radius: .3rem;
  padding: .8rem .8rem;
 }

 .file{
  width: 100%;
  margin-bottom: 1rem;
  cursor: pointer;
  &::-webkit-file-upload-button {
  visibility: hidden;
   }
  &::before {
  content: 'Choose a Photo';
  display: inline-block;
  background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
  border: 1px solid #3f729b;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 900;
  font-size: 10pt;
}
&:hover::before {
  border-color: gray;
}
&:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}
}
.button{
  margin-bottom: 1rem;
  background-color: #fafafa;
  color:  #3f729b;
  cursor: pointer;
  opacity: 0.8;
  transition: all .1s ease;
  border: 1px solid gray;
  outline: none;
  border-radius: .3rem;
  padding: .8rem .8rem;
  
  &:disabled,
  &[disabled]{
  background-color: #cccccc;
  pointer-events: none;
  
  
  }
  &:active{
    transform: translateY(.7rem)
  }
  &:hover {
  opacity: 1;
  background-color:  #3f729b;
  color: #fafafa ;
}
}
`

export default ImageUpload
