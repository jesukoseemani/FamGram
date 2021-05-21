import React, { useState, useEffect } from "react"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import DashBoard from "../src/pages/DashBoard"
import UserProfile from "../src/pages/UserProfile"
import GlobalStyle from "./Components/GlobalStyle"
import styled from "styled-components"
import { motion } from "framer-motion"
import {Route, Switch, useHistory} from "react-router-dom"
import { auth } from "./firebase";

function App() {
 const [user, setUser] = useState(null)
 const history = useHistory()
 useEffect(() => {
 const unSubscribe = auth.onAuthStateChanged((authUser) => {
     if(authUser){
      setUser(authUser)
  
     }else{
      setUser(null)
      history.push("/login")
     }

 })
  
  return () => { 
    
    unSubscribe()
  
  }
  },[user, history])

  

  
  return (
    <StyledApp>
     <GlobalStyle />
     
     <Switch>
       
       <Route path="/login" exact>
       <Login />
       </Route>
       
       <Route path="/signup" exact>
       <SignUp />    
       </Route>
       
       <Route path="/" exact>
        <DashBoard user={user}/> 
       </Route>

       <Route path="/p/:id" exact>
       <UserProfile user={user}/>    
       </Route>
  
     </Switch>
    
     
    
    </StyledApp>
  );
}

const StyledApp = styled(motion.div)`
width: 100%;

`

export default App;
