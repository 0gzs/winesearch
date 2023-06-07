import React, { useEffect, useState } from 'react'

import SeachByName from './search-by-name'
import SearchByDescription from './search-by-desc'

import './form.scss'
import Dropdown from './dropdown'

const Form = ({ setResults }) => {
  const [searchByName, setSearchByName] = useState(false)
  const [wineName, setWineName] = useState('')
  const [wineDescription, setWineDescription] = useState('')
  const [wineType, setWineType] = useState('')
  const [wineRegion, setWineRegion] = useState('')
  const [wineRating, setWineRating] = useState('')

  const changeHandler = (name, value) => {
    switch (name) {
      case 'types':
        setWineType(value)
        break
      case 'region':
        setWineRegion(value)
        break
      case 'rating':
        setWineRating(value)
        break
      case 'desc':
        setWineDescription(value)
        break
      default:
        break
    }
  }

  useEffect(() => {
    const search = () => {
      let storage = localStorage.getItem('results')
      let results = JSON.parse(storage)

      if (wineName.length > 0) {
        results = results.filter(wine => wine.name.toLowerCase().includes(wineName.toLowerCase()))
      }

      if (wineDescription.length > 0) {
        results = results.filter(wine => wine.description.toLowerCase().includes(wineDescription.toLowerCase()))
      }

      if (wineType.length > 0) {
        results = results.filter(wine => wine.type.toLowerCase().includes(wineType.toLowerCase()))
      }

      if (wineRegion.length > 0) {
        results = results.filter(wine => wine.region.toLowerCase().includes(wineRegion.toLowerCase()))
      }

      if (wineRating.length > 0) {
        results = results.filter(wine => wine.rating.toLowerCase().includes(wineRating.toLowerCase()))
      }

      setResults(results)
    }
    
    if (
      wineName.length > 0 ||
      wineDescription.length > 0 ||
      wineType.length > 0 ||
      wineRegion.length > 0 ||
      wineRating.length > 0
    ) search()

    if (
      wineName.length === 0 &&
      wineDescription.length === 0 &&
      wineType.length === 0 &&
      wineRegion.length === 0 &&
      wineRating.length === 0
    ) setResults([])
  }, [wineName, wineDescription, wineType, wineRegion, wineRating, setResults])

  return (
    <div className="form-container">
      <h1>Let's find your next wine!</h1>
      <p className='sub-heading'>Provide us with a few details that might assist us in our search</p>

      <div className="search-buttons-wrapper">
        <div className={"formGroup"}>
          <Dropdown
            onChange={changeHandler}
            title={'Varietal'}
            name="types"
            icon={"fa-solid fa-wine-bottle"} />
        </div>

        {!searchByName && <div className={"formGroup"}>
          <Dropdown
            onChange={changeHandler}
            title={'Region'}
            name="region"
            icon={"fa-regular fa-map"} />
        </div>}

        <div className={"formGroup"}>
          <Dropdown
            onChange={changeHandler}
            title={'Rating'}
            icon={"fa-solid fa-star-half-stroke"}
            name="rating" />
        </div>
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
