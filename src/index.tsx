import { enableMapSet } from 'immer'
import { unstable_setRemoveBackgroundEnabled } from 'polotno/config'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

unstable_setRemoveBackgroundEnabled(true)

enableMapSet()

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
