import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import ScrollToTop from './components/ScrollToTop'
import { AuthContextProvider } from './context/authContext'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

const queryClient = new QueryClient()

function App () {
  return (
    <ThemeProvider theme={defaultTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <BrowserRouter>
            <GlobalStyle />
            <ScrollToTop />
            <Router />
          </BrowserRouter>
        </AuthContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
