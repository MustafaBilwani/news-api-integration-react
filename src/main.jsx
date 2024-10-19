import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from './components/ui/provider.jsx'

createRoot(document.getElementById('root')).render(
  <Provider>
    <App />
  </Provider>,
)
