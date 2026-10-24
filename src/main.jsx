import LanguageProvider from './i18n/LanguageProvider'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from "./App"
import { BrowserRouter } from "react-router-dom"


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LanguageProvider><App /></LanguageProvider>
  </BrowserRouter>
)
