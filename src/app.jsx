import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

import Wine from './components/wine'
import Form from './components/form'

function App() {
  const [results, setResults] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    let storage = localStorage.getItem('results')
    if (!storage) axios.get('https://winesearch.herokuapp.com/api/wines').then(res => {
      localStorage.setItem('results', JSON.stringify(res.data))
    })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (container) container.scrollTop = 0
  }, [results])

  return (
    <>
      <header>
        <h3>wineglass</h3>
      </header>

      <div className="wrapper">
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
