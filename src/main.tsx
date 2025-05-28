import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import World from '@/components'
import "@/global.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <World />
  </StrictMode>,
)
