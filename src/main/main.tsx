import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LoginTemplate } from '@/presentation/templates/LoginTemplate.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoginTemplate />
  </StrictMode>,
)
