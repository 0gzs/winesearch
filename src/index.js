import React from 'react'
import './global.scss'
import { createRoot } from 'react-dom/client'
import App from './app.jsx'

const container = document.getElementById('app')
const root = createRoot(container)

root.render(<App/>)
