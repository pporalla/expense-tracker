import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Main from './App.jsx'
import Home from "./Components/Home.jsx"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
    
  </StrictMode>,
)
