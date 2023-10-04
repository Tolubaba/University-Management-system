import { createGlobalStyle } from "styled-components";

const GlobalStyles= createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Martian+Mono:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500;600;700&display=swap');


  *{
    margin:0;
    box-sizing:border-box;
    padding:0;
  }

:root{

      --fontfamily: 'Manrope', sans-serif;
      --fontfamily2: 'Martian Mono', monospace;
      --fontfamily3: 'Roboto Slab', serif;
    

}

`

export default GlobalStyles