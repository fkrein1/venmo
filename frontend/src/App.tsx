import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import ScrollToTop from './components/ScrollToTop'
import { reactQueryClient } from './lib/reactQuery'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

function App () {
  return (
    <ThemeProvider theme={defaultTheme}>
      <QueryClientProvider client={reactQueryClient}>
        <BrowserRouter>
          <GlobalStyle />
          <ScrollToTop />
          <Router />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
