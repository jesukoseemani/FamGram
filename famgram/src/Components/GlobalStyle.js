import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box
}

html{
  font-size: 10px;
    
}

body{
    font-family: 'Inter', sans-serif;
    width: 100%;
    background-color: #fafafa;
}

button{
    font-weight: bold;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 1rem 2rem;
    border: 3px solid #23d997;
    background: transparent;
    color: white;
    transition: all 0.5s ease;
    font-family: 'Inter', sans-serif;
    &:hover{
        background-color: #23d997;
        color: white;
    }
}
    h2{
        
    }

    h3{
        
    }

    h4{
        
       
    }
   
    span{
        font-weight: bold;
    }

  

`;

export default GlobalStyle;
