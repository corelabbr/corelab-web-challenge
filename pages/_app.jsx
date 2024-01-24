import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
      padding: 0;
      margin: 0;
    }

    body {
      font-family: 'Roboto', sans-serif;
      background: #F0F2F5;
    }
`

function App ({ Component, pageProps }) {
  return (
    <>
        <GlobalStyle />
        <Component {...pageProps} />
    </>
  )
}

export default App