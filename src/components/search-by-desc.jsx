import React, { useEffect } from 'react'

const SearchByDescription = ({ text, onChange, viewSearch }) => {

  useEffect(() => {
    return () => {
      onChange(false)
    }
  }, [onChange])

  return (
    <>
      <div className="formGroup">
        <input
          type="text"
          placeholder='e.g. butter, tannin, cherry, fig'
          value={text || ''}
          onChange={e => onChange(e.target.value)} />
      </div>

      <div className="search-type-wrapper">
        <p>
          OR 
        </p>
        <button className="button" onClick={() => viewSearch(true)}>
          search by name
        </button>
      </div>
    </>
  )
}

export default SearchByDescription
