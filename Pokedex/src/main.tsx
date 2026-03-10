import ReactDom  from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import App from './App.tsx'

ReactDom.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
