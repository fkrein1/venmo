import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import ScrollToTop from './components/ScrollToTop'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

function App () {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <GlobalStyle />
        <ScrollToTop />
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
