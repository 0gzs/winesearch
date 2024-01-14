import React, { useEffect } from 'react'

const Search = ({ searchByState, placeholder }) => {
  const { searchByName, setSearchByName, searchQuery, setSearchQuery } = searchByState

  useEffect(() => {
    return () => {
      setSearchQuery(false)
      setSearchByName(false)
    }
  }, [setSearchQuery, setSearchByName])

  return (
    <>
      <div className="formGroup">
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery || ''}
          onChange={e => setSearchQuery(e.target.value)} />
      </div>
    </>
  )
}

export default Search
