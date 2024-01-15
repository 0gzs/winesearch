import React, { useState, useRef } from 'react'
import useScrollEffect from '../hooks/useScrollEffect.js'
import Wine from './wine'
import Form from './form'

import './main.scss'

const Main = ({ effectState }) => {
  const [results, setResults] = useState([])
  const [keywords, setKeywords] = useState([])

  const containerRef = useRef(null)
  useScrollEffect(containerRef, results, effectState)

  return (
    <main>
      <div className="form-container">
        <Form setResults={setResults} setKeywords={setKeywords} />
      </div>

      {Array.isArray(results) && results.length > 0 && (
        <div ref={containerRef} className={`resultsGrid top-margin`}>
          {results.map((w, i) => w && <Wine key={i} wine={w} keywords={keywords} />)}
        </div>
      )}
    </main>
  )
}

export default Main
