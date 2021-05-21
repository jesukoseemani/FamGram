import React, {useState, useEffect} from 'react'
import selfie from "../img/selfie.svg"
import logo from "../img/famgram.svg"
import styled from "styled-components"
import { motion } from "framer-motion"
import { Link,useHistory } from "react-router-dom"
import firebase from "firebase"
import { db , auth } from "../firebase"
import { Circle } from 'better-react-spinkit'

function SignUp() {
  const [username, setUsername] = useState("")
  const [fullname, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [circle, setCircle] = useState(false)
  const history = useHistory()

  useEffect(() => {
    const timer = setTimeout(() => {
       setError("")
       setCircle(false)
     }, 3000);
     return () => clearTimeout(timer);
   },[error,setError]);


  const submitUserCredentials = (e) => {
  e.preventDefault()
  
  db.collection('Users').where("username","==",username).get()
  .then((queryShot) => {
    setCircle(true)
     if(queryShot.docs.length >= 1){
       return null
      //  setError({...error, name:"this username is already taken"})
      // setCircle(false)
     }else{
     return auth.createUserWithEmailAndPassword(email, password)
     }
     
  })
  .then((authUser) => {
    authUser.user.updateProfile({
      displayName: username,
    })

     const user = {
       userId : authUser.user.uid,
       email,
       fullname,
       username,
       bio: "",
       imageUrl: "",
       timestamp: firebase.firestore.FieldValue.serverTimestamp(),       
     }
    
     return db.collection('Users').add(user)
     
  })
  .then(() => {
    
    setFullName("")
    setEmail('')
    setUsername("")
    setPassword("")
    setCircle(false)
    return history.push("/")
  })
  .catch((err) => {
   
    setError(err.message)
    
  })
  
  }

  return (
    <Headerpart>
    <Styledshowcase>
      <img src={selfie} alt="desc_illustration" />
    </Styledshowcase>
    <Styledform>
      
      <form className="form">
      <div style={{color: "red", 
                  textAlign: "center",
                  marginBottom:"1.5rem",
                  fontSize:"1.5rem",
                  fontStyle:"italics"}}> {error}</div>
     
      <div className="form_input">
      <div className="form_image">
      <img src={logo} alt="logo" />
      </div>
      <input  
      type="text" 
      value={username} 
      placeholder="Username" 
      onChange={(e) => setUsername(e.target.value)} />

      <input  
      type="text" 
      value={fullname} 
      placeholder="Full Name"
      onChange={(e) => setFullName(e.target.value)} />

      <input  
      type="email" 
      value={email} 
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)} />

      <input  
      type="password" 
      value={password} 
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)} />
      
      <input  
      type="submit" 
      value="Sign Up"
      onClick={submitUserCredentials} />
      
      </div>
      
      {circle &&
      <div className="circle">
      <Circle size={25} color='blue'/>
      </div>
      }

      <div className="form_logIn">
      <p>Have an account? <span className="sign_span" > <Link to="/login">Log In.</Link></span></p>
      </div>    
      </form>
    </Styledform>
    </Headerpart>
  )
}

const Headerpart = styled(motion.div)`
display: flex;
justify-content: center;
align-items: center;
width: 50%;
height: 100vh;
margin: 0 auto;
@media(max-width: 800px){
  width: 100%;
 }
`
const Styledshowcase = styled(motion.div)`
 img{
   width: 30rem;
   object-fit:contain;
   @media(max-width: 800px){
    width: 18rem;
 }
 @media(max-width: 550px){
   display: none;
 }
 }
`

const Styledform = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;

.form{
  padding: 3rem;
  width: 100%;

  @media(max-width: 800px){
    width: 95%;
 }
 @media(max-width: 550px){
  width: 100%;
 }
  .form_image{
    display:flex;
    justify-content: center;
    align-items: center;
    margin: .7rem;

    img{
      width:20rem;
      height:4rem;
      object-fit: contain;
      @media(max-width: 800px){
       width: 15rem;
       height:3rem;
      }
      @media(max-width: 550px){
        width:20rem;
      height:4rem;
      }
    }
  }

  .form_input{
    border: 1px solid #dddddd;
    padding:.7rem;
  }

  .form_logIn{
    border: 1px solid #dddddd;
    margin-top: 1rem;
    display: flex;
    align-items:center;
    justify-content:center;
  }
  .circle{
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top: 1rem;
  }
}

h2{
  margin: 2rem 0;
}

input{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid gray;
  outline: none;
  border-radius: .3rem;
  padding: .8rem .5rem; 
}

input[type = text]{
  margin-bottom: .5rem;
}

input[type = email]{
  margin-bottom: .5rem;
}

input[type = password]{
  margin-bottom: .5rem;
}

input[type = submit]{
  margin-bottom: 1rem;
  background-color: #3f729b;
  color: #fafafa;
  cursor: pointer;
  opacity: 0.8;
  transition: all .1s ease;
  &:active{
    transform: translateY(.7rem)
  }
  &:hover {
  opacity: 1;
}
}

p{
 font-size: 1.2rem;
 font-weight: bold;
 color: #575757;
 padding: .8rem .8rem;
 @media(max-width: 800px){
  font-size: 1rem;
      }
      @media(max-width: 550px){
  font-size: 1.2rem;
      }
}
.sign_span{
cursor: pointer;
color: #3f729b;
&:hover{
  text-decoration: underline;
}
}`


export default SignUp
