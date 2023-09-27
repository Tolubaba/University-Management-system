import { createGlobalStyle } from "styled-components";

const GlobalStyles= createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap');

  *{
    margin:0;
    box-sizing:border-box;
    padding:0;
  }

:root{

      --fontfamily: 'Manrope', sans-serif;
    

}

`

export default GlobalStyles