import React, { useEffect } from 'react'

const SearchByName = ({ text, onChange, viewSearch }) => {

  useEffect(() => {
    return () => {
      onChange('')
    }
  }, [onChange])

  return (
    <div className="flex-col">
      <div className="form-group">
        <input
          type="text"
          placeholder="e.g. Unruly, Prisoner, Arius"
          value={text}
          onChange={e => onChange(e.target.value)} />
      </div>

      <div className="nameStrict">
        <p>Or,
          <span
            id="toggleName"
            style={{ cursor: 'pointer', marginLeft: '5px' }}
            onClick={() => {
              viewSearch(false)
            }}>
            go back
          </span>
        </p>
      </div>

      <button className="button" type="button"
        onClick={() => { }}>Search</button>
    </div>
  )
}

export default SearchByName
