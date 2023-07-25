import React, { useEffect } from 'react'

const SearchByName = ({ text, onChange, viewSearch }) => {

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
          placeholder="e.g. Unruly, Prisoner, Arius"
          value={text}
          onChange={e => onChange(e.target.value)} />
      </div>

      <div className="nameStrict">
        <p>
          OR
        </p>
        <button id="toggleName" className='button' onClick={() => viewSearch(false)}>
          search by description
        </button>
      </div>
    </div>
  )
}

export default SearchByName
