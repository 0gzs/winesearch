import React, { useEffect } from 'react'

const SearchByDescription = ({ text, onChange, viewSearch }) => {

  useEffect(() => {
    return () => {
      onChange('')
    }
  }, [onChange])

  return (
    <div className="flex-col">
      <div className="formGroup">
        <input
          type="text"
          placeholder='e.g. butter, tannin, cherry, fig'
          value={text}
          onChange={e => onChange(e.target.value)} />
      </div>

      <div className="nameStrict">
        <p>
          OR 
        </p>
        <button id="toggleName" className="button" onClick={() => viewSearch(true)}>
          search by name
        </button>
      </div>
    </div>
  )
}

export default SearchByDescription
