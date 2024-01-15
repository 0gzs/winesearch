import React, { useEffect, useState, useRef } from 'react'
import Wine from './wine'
import Form from './form'

import './main.scss'

const Main = () => {
  const [results, setResults] = useState([])
  const [keywords, setKeywords] = useState([])

  const containerRef = useRef(null)

  useEffect(() => {
    if (results) console.log(results)
    const container = containerRef.current
    if (container) container.scrollTop = 0
  }, [results])

  return (
    <main>
      <div className="form-container">
        <Form setResults={setResults} setKeywords={setKeywords} />
      </div>

      {Array.isArray(results) && results.length > 0 && (
        <div ref={containerRef} className={`resultsGrid ${results.length > 0 ? 'top-margin': ''}`}>
          {results.map((w, i) => w && <Wine key={i} wine={w} keywords={keywords} />)}
        </div>
      )}
    </main>
  )
}

export default Main
