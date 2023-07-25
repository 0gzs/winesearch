import React, { useEffect, useState } from 'react'
import wine from '../data/wine.json'

import SeachByName from './search-by-name'
import SearchByDescription from './search-by-desc'

import './form.scss'
import Dropdown from './dropdown'

const Form = ({ setResults, setKeywords }) => {
  const [searchByName, setSearchByName] = useState(false)
  const [wineName, setWineName] = useState('')
  const [wineDescription, setWineDescription] = useState('')
  const [wineType, setWineType] = useState('')
  const [wineRegion, setWineRegion] = useState('')
  const [wineRating, setWineRating] = useState('')

  const changeHandler = (name, value) => {
    name = name.toLowerCase()
    switch (name) {
      case 'varietal':
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
      let results = wine

      if (searchByName && wineName.length > 0) {
        setKeywords([ wineName ])
        results = results.filter(wine => wine.name.toLowerCase().includes(wineName.toLowerCase()))
      }

      if (!searchByName && wineDescription.length > 0) {
        if (wineDescription.includes(',')) {
          let keywords = wineDescription.split(',').map(word => word.trim())
          keywords = keywords.filter(word => word !== ' ' && word !== '').map(word => word.trim())

          setKeywords([ ...keywords ])

          results = results.filter(wine => keywords.some(keyword => wine.description.toLowerCase().includes(keyword.toLowerCase())))
        } else {
          let keyword = [ wineDescription.trim() ]

          setKeywords([ ...keyword ])

          results = results.filter(wine => wine.description.toLowerCase().includes(wineDescription.toLowerCase()))
        }
      }

      if (!searchByName && wineType.length > 0) {
        results = results.filter(wine => wine.type.toLowerCase().includes(wineType.toLowerCase()))
      }

      if (!searchByName && wineRegion.length > 0) {
        results = results.filter(wine => wine.region.toLowerCase().includes(wineRegion.toLowerCase()))
      }

      if (!searchByName && wineRating.length > 0) {
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
    ) {
      setResults([])
      setKeywords([])
    }
  }, [wineName, wineDescription, wineType, wineRegion, wineRating, searchByName, setResults, setKeywords])

  return (
    <div className="form-container">
      <h1>Let's find your next wine!</h1>
      <p className='sub-heading'>Provide us with a few details that might assist us in our search</p>

      <div className="search-buttons-wrapper">
        <div className={"formGroup"}>
          <Dropdown
            onChange={changeHandler}
            title={'Varietal'}
            icon={"fa-solid fa-wine-bottle"} />
        </div>

        {!searchByName && <div className={"formGroup"}>
          <Dropdown
            onChange={changeHandler}
            title={'Region'}
            icon={"fa-regular fa-map"} />
        </div>}

        <div className={"formGroup"}>
          <Dropdown
            onChange={changeHandler}
            title={'Rating'}
            icon={"fa-solid fa-star-half-stroke"} />
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
