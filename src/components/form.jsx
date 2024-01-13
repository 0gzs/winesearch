import React, { useEffect, useState } from 'react'
import useWineSearch from '../hooks/useWineSearch'

import regions from '../data/regions.json'
import varietals from '../data/varietals.json'

import SeachByName from './search-by-name'
import SearchByDescription from './search-by-desc'

import './form.scss'
import Dropdown from './dropdown'

const Form = ({ setResults, setKeywords }) => {
  const [searchByName, setSearchByName] = useState(false)
  const [wineName, setWineName] = useState('')
  const [wineDescription, setWineDescription] = useState('')
  const [wineType, setWineType] = useState(false)
  const [wineRegion, setWineRegion] = useState(false)
  const [wineRating, setWineRating] = useState(false)

  const { results, keywords } = useWineSearch(searchByName, wineName, wineDescription, wineType, wineRegion, wineRating)

  useEffect(() => {
    if (results.length > 0) {
      setResults(results)
    } else setResults([])

    if (keywords.length > 0) {
      setKeywords([...keywords])
    } else setKeywords([])
  }, [results, keywords, setResults, setKeywords])

  return (
    <div className={`form-wrapper ${results.length > 0 && "top-margin"}`}>
      <h1>Let's find your next favorite wine!</h1>
      <p className='sub-heading'>Provide a few details to assist in the search.</p>

      <div className={`search-buttons-wrapper ${searchByName && 'align-left'}`}>
        <Dropdown
          selectState={{ selection: wineType, setSelection: setWineType }}
          title={'Varietal'}
          options={varietals}
          icon={"fa-solid fa-wine-bottle"} />

        {!searchByName && (
          <Dropdown
            selectState={{ selection: wineRegion, setSelection: setWineRegion }}
            title={'Region'}
            options={regions}
            icon={"fa-regular fa-map"} />
        )}

        <Dropdown
          selectState={{ selection: wineRating, setSelection: setWineRating }}
          title={'Rating'}
          options={[1, 2, 3, 4, 5]}
          icon={"fa-solid fa-star-half-stroke"} />
      </div>

      {searchByName ? (
        <SeachByName
          text={wineName}
          onChange={setWineName}
          viewSearch={setSearchByName}
        />
      ) : (
        <SearchByDescription
          text={wineDescription}
          onChange={setWineDescription}
          viewSearch={setSearchByName}
        />
      )}

    </div>
  )
}

export default Form
