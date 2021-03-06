import React, {useState, useEffect} from 'react';
import Header from "../Components/Header";
import Skeleton from "../Components/Skeleton"
import { db } from "../firebase";

function DashBoard({user}) {
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

  const [openUL, setOpenUL] = useState(null)

  const run = () =>  setOpenUL(value => !value); 
  return (
    <>
      <Header userDetails={userDetails} openUL={openUL} run={run} setOpenUL={setOpenUL} />
      <Skeleton user={user} userDetails={userDetails} openUL={openUL}/>
    </>
    
  )
}

export default DashBoard
