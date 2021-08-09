import AuthState from '../context/auth/authState';
import AlertState from '../context/alert/alertState';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
  --white: #ffffff;
  --gray: #2f3848;
  --primary: #f46969;
  --bluelight: #51b5f5;
  --bluedark: #27224f;
  --headingFont:'Raleway', sans-serif;
  --textFont:  'Roboto', sans-serif;
  --bg: #f3f3f3;
}
*, *:before, *:after {
  box-sizing: inherit;
} 
html {
  box-sizing: border-box;
  height: 100%;
  font-size: 62.5%; 
}
body {
    max-width: 100%;
    min-height: 100%;
    background-color: var(--bg);
    font-size: 16px; 
    font-size: 1.6rem;
    font-family: var(--textFont);
    margin: 0;
}

main{
  margin-bottom: 5rem;
}

h1{
  text-align: center;
}

a{
  text-decoration: none;
  color: inherit
}

.container {
@media screen and (min-width: 992px) {
     max-width: 1200px;
     margin: auto;
  }
   
}

.shadow{
    -webkit-box-shadow: 0px 6px 11px -8px rgba(0, 0, 0, 0.9);
    -moz-box-shadow: 0px 6px 11px -8px rgba(0, 0, 0, 0.9);
    box-shadow: 0px 6px 11px -8px rgba(0, 0, 0, 0.9);
  }

.btn {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-family: var(--headingFont);
  padding: 1.5rem;
  font-size: 1.4;
  font-weight: 400;
  border-radius: .5rem;
  border: none;
  transition: background-color .3s ease;
  cursor: pointer;
  :hover{
    filter: drop-shadow(rgba(39, 34, 79, 0.2) 0px 4px 4px);
  }
}

.btn-primary {
  background-color: var(--bluelight);
  color: var(--white);
}

.btn-secundary {
  background-color: var(--primary);
  color: var(--white)
}
.btn-block {
  display: block;
  width: 100%;
}

.linkto{
    margin-top: 2rem;
  display: block;
  opacity: .7;
}
`;

const theme = {
    colors: {
        primary: '#fafafa',
    },
};

function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <AlertState>
                    <AuthState>
                        <Component {...pageProps} />
                    </AuthState>
                </AlertState>
            </ThemeProvider>
        </>
    );
}

export default MyApp;
