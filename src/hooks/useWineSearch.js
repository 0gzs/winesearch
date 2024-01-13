import { useState, useEffect } from 'react'
import { debounce } from 'lodash'
import wine from '../data/wine.json'

const useWineSearch = (searchByName, wineName, wineDescription, wineType, wineRegion, wineRating) => {
  const [results, setResults] = useState([])
  const [keywords, setKeywords] = useState([])

  useEffect(() => {
    const debounceSearch = debounce(() => search(), 500)

    const toLowerCaseIncludes = (value, search) =>
      value.toLowerCase().includes(search.toLowerCase())

    const filterWines = (wines, filterCriteria) => {
      return wines.filter(filterCriteria)
    }

    const filterWinesByDescription = (wines, filterCriteria) => {
      let keywords = wineDescription.split(',').map(word => word.trim())
      keywords = keywords.filter(word => word !== ' ' && word !== '').map(word => word.trim())

      setKeywords([...keywords])

      return wines.filter(wine => keywords.some(keyword => toLowerCaseIncludes(wine.description, keyword)))
    }

    const search = () => {
      let results = wine

      if (searchByName) {
        results = filterWines(results, wine => toLowerCaseIncludes(wine.name, wineName))
      } else {

        if (wineDescription && wineDescription.length > 0) {
          let keywords = wineDescription.split(',').map(word => word.trim())
          keywords = keywords.filter(word => word !== ' ' && word !== '').map(word => word.trim())
          setKeywords([keywords])
          results = filterWinesByDescription(results, wine => toLowerCaseIncludes(wine.description, keywords, true))
        } else if (wineDescription) {
          let keyword = [wineDescription.trim()]
          setKeywords([...keyword])
          results = filterWinesByDescription(results, wine => toLowerCaseIncludes(wine.description, keyword))
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
