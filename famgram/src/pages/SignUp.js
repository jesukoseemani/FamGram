import React from 'react'
import selfie from "../img/selfie.svg"
import logo from "../img/prototype.PNG"
import styled from "styled-components"
import { motion } from "framer-motion"

function SignUp() {
  return (
    <Headerpart>
    <Styledshowcase>
      <img src={selfie} alt="desc_illustration" />
    </Styledshowcase>
    <Styledform>
      <form className="form">
      <div className="form_input">
      <div className="form_image">
      <img src={logo} alt="logo" />
      </div>
      <input  type="text" placeholder="Username"/>
      <input  type="text" placeholder="Full Name"/>
      <input  type="email" placeholder="Email"/>
      <input  type="password" placeholder="Password"/>
      <input  type="submit" value="Sign Up" />
      </div>
      <div className="form_logIn">
      <p>Have an account? <span className="sign_span">Log In.</span></p>
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
`
const Styledshowcase = styled(motion.div)`
 img{
   width: 30rem;
   object-fit:contain;
 }
`

const Styledform = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;

.form{
  padding: 3rem;
  width: 100%;
  .form_image{
    display:flex;
    justify-content: center;
    align-items: center;
    margin: .7rem
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
  opacity: 0.6;
  &:hover {
  opacity: 1;
}
}

p{
 font-size: 1.2rem;
 font-weight: bold;
 color: #575757;
}
.sign_span{
cursor: pointer;
color: #3f729b;
&:hover{
  text-decoration: underline;
}
}`


export default SignUp