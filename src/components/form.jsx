import React, { useEffect, useState } from 'react'
import useWineSearch from '../hooks/useWineSearch'

import regions from '../data/regions.json'
import varietals from '../data/varietals.json'

import './form.scss'
import Dropdown from './dropdown'

const Form = ({ setResults, setKeywords }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchByName, setSearchByName] = useState(false)
  const [wineType, setWineType] = useState(false)
  const [wineRegion, setWineRegion] = useState(false)
  const [wineRating, setWineRating] = useState(false)

  const { results, keywords } = useWineSearch(searchByName, searchQuery, wineType, wineRegion, wineRating)

  useEffect(() => {
    if (results.length > 0) {
      setResults(results)
    } else setResults([])

    if (keywords.length > 0) {
      setKeywords([...keywords])
    } else setKeywords([])
  }, [results, keywords, setResults, setKeywords])

  return (
    <div className='form-wrapper'>
      <h1>Let's find your next favorite wine!</h1>
      <p className='sub-heading'>Provide a few details to assist in the search.</p>

      <div className='search-buttons-wrapper'>
        <Dropdown
          selectState={{ selection: wineType, setSelection: setWineType }}
          title={'Varietal'}
          options={varietals}
          icon={"fa-solid fa-wine-bottle"} />

        <Dropdown
          selectState={{ selection: wineRegion, setSelection: setWineRegion }}
          title={'Region'}
          options={regions}
          icon={"fa-regular fa-map"} />

        <Dropdown
          selectState={{ selection: wineRating, setSelection: setWineRating }}
          title={'Rating'}
          options={[1, 2, 3, 4, 5]}
          icon={"fa-solid fa-star-half-stroke"} />
      </div>

      <div className="formGroup">
        <input
          type="text"
          placeholder={searchByName ? 'e.g. Unruly' : 'e.g. butter, tannin, cherry, fig'}
          value={searchQuery || ''}
          onChange={e => setSearchQuery(e.target.value)} />
      </div>

      <span className='search-by-wrapper'>
        <div className={`search-by-toggle ${searchByName ? 'on' : 'off'}`}>
          <div className="search-by-toggle__circle" onClick={() => setSearchByName(!searchByName)}></div>
        </div>
        <p>or, search by {!searchByName ? <span>name.</span> : <span>description.</span>}</p>
      </span>

    </div>
  )
}

export default Form
