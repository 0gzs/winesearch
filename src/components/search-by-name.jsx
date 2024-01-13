import React, { useEffect } from 'react'

const SearchByName = ({ text, onChange, viewSearch }) => {

  useEffect(() => {
    return () => {
      onChange('')
    }
  }, [onChange])

  return (
    <>
      <div className="formGroup">
        <input
          type="text"
          placeholder="e.g. Unruly, Prisoner, Arius"
          value={text}
          onChange={e => onChange(e.target.value)} />
      </div>

      <div className="search-type-wrapper">
        <p>
          OR
        </p>
        <button className='button' onClick={() => viewSearch(false)}>
          search by description
        </button>
      </div>
    </>
  )
}

export default SearchByName
