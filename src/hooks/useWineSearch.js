import { useState, useEffect } from 'react'
import { debounce } from 'lodash'
import wine from '../data/wine.json'

const useWineSearch = (searchByName, wineName, wineDescription, wineType, wineRegion, wineRating) => {
  const [results, setResults] = useState([])
  const [keywords, setKeywords] = useState([])

  useEffect(() => {
    const debounceSearch = debounce(() => search(), 500)

    const toLowerCaseIncludes = (baseString, queryString) => {
      return baseString.toLowerCase().includes(queryString.toLowerCase())
    }

    const filterWines = (wines, filterCriteria) => {
     return wines.filter(filterCriteria)
    }

    const search = () => {
      let results = wine

      if (searchByName) {
        results = filterWines(results, wine => toLowerCaseIncludes(wine.name, wineName))
      } else {
        let trimmedStr = wineDescription.trim()

        if (wineDescription && wineDescription.split(',').length > 1) {
          let keywords = trimmedStr.split(',').map(word => word)
          keywords = keywords.filter(word => word !== ' ' && word !== '').map(word => word.trim())
          setKeywords(keywords)

          results = filterWines(results, wine => keywords.some(keyword => toLowerCaseIncludes(wine.description, keyword)))
        } else if (wineDescription && wineDescription !== '') {
          setKeywords([trimmedStr])
          results = filterWines(results, wine => toLowerCaseIncludes(wine.description, trimmedStr))
        }
      }

      if (wineType.length > 0) {
        results = filterWines(results, wine => toLowerCaseIncludes(wine.type, wineType))
      }

      if (wineRating.length > 0) {
        results = filterWines(results, wine => toLowerCaseIncludes(wine.rating, wineRating))
      }

      if (wineRegion.length > 0) {
        results = filterWines(results, wine => toLowerCaseIncludes(wine.region, wineRegion))
      }

      setResults(results)
    }

    if (
      wineName.length > 0 ||
      wineDescription.length > 0 ||
      wineType.length > 0 ||
      wineRegion.length > 0 ||
      wineRating.length > 0
    ) debounceSearch()

    if (
      !wineName &&
      !wineDescription &&
      !wineType &&
      !wineRegion &&
      !wineRating
    ) {
      setResults([])
      setKeywords([])
    }

  }, [wineName, wineDescription, wineType, wineRegion, wineRating, searchByName])

  return { results, keywords }
}

export default useWineSearch
