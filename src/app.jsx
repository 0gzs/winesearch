import React, { useEffect, useRef, useState } from 'react'

import Wine from './components/wine'
import Form from './components/form'

function App() {
  const [results, setResults] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (container) container.scrollTop = 0
  }, [results])

  useEffect(() => {
    if (results.length > 0) {
      const form = document.querySelector('.form-container')
      form.classList.add('form-container--results')
    }
  })

  return (
    <>
      <header>
        <h3>wineglass</h3>
      </header>

      <div className={`wrapper ${results.length > 0 && 'wrapper-with-results'}`}>
        <Form setResults={setResults} />

        {results.length > 0 && (
            <div ref={containerRef} className="resultsGrid">
              {results.map((w, i) => w && <Wine key={i} wine={w} />)}
            </div>
        )}
      </div>
    </>
  )
}

export default App
