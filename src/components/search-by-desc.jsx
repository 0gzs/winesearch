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
        <p>Or, <span id="toggleName" onClick={() => viewSearch(true)}>
            search by name
          </span>
        </p>
      </div>

      <button className='button' type="button" onClick={() => { }}>Submit</button>
    </div>
  )
}

export default SearchByDescription
