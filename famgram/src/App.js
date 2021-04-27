import Login from "./pages/Login"
// import SignUp from "./pages/SignUp"
import GlobalStyle from "./Components/GlobalStyle"
import styled from "styled-components"
import { motion } from "framer-motion"

function App() {
  return (
    <StyledApp>
     <GlobalStyle />
     <Login />
     {/* <SignUp /> */}
    </StyledApp>
  );
}

const StyledApp = styled(motion.div)`
width: 100%;

`

export default App;
