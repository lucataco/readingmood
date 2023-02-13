import Script from 'next/script'
import { ChakraProvider } from '@chakra-ui/react'
import './styles.css';

function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Script defer data-domain="readingmoods.vercel.app" src="https://data.lucata.co/js/script.js" />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default App;
