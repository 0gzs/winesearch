import React, { useState } from 'react'

import Header from './components/header'
import Main from './components/main'

function App() {  
  const [shrink, setShrink] = useState(false)
  return (
    <div className="container">
      <Header effectState={{ effect: shrink }} />
      <Main effectState={{ effect: shrink, setEffect: setShrink }} />
    </div>
  )
}

export default App
