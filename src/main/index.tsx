import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import World from '@/browser/components'
import "@/main/global.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <World />
  </StrictMode>,
)
