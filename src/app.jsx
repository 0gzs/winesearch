import React, { useEffect, useRef, useState } from 'react'

import Wine from './components/wine'
import Form from './components/form'
import Header from './components/header'

function App() {
  const [results, setResults] = useState([])
  const [keywords, setKeywords] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (container) container.scrollTop = 0
  }, [results])

  return (
    <>
      <div className="wrapper">
        <Header />

        <main>
          <div className="form-container">
            <Form setResults={setResults} setKeywords={setKeywords} />
          </div>

          {results.length > 0 && (
            <div ref={containerRef} className="resultsGrid">
              {results.map((w, i) => w && <Wine key={i} wine={w} keywords={keywords} />)}
            </div>
          )}
        </main>
      </div>
    </>
  )
}

export default App
