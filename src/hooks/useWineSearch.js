import { useEffect } from 'react'
import wine from '../data/wine.json'

const useWineSearch = (searchByName, searchQuery, wineType, wineRegion, wineRating, setResults, setKeywords) => {
  const toLowerCaseIncludes = (baseString, queryString) => {
    return baseString.toLowerCase().includes(queryString.toLowerCase())
  }

  const filterWines = (wines, filterCriteria) => {
    return wines.filter(filterCriteria)
  }

  useEffect(() => {


    function search() {
      let results = wine

      if (searchByName) {
        results = filterWines(results, wine => toLowerCaseIncludes(wine.name, searchQuery))
      } else {
        let trimmedStr = searchQuery.trim()

        if (searchQuery && searchQuery.split(',').length > 1) {
          let keywords = trimmedStr.split(',').map(word => word)
          keywords = keywords.filter(word => word !== ' ' && word !== '').map(word => word.trim())
          setKeywords(keywords)

          results = filterWines(results, wine => keywords.some(keyword => toLowerCaseIncludes(wine.description, keyword)))
        } else if (searchQuery && searchQuery !== '') {
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
      searchQuery.length > 0 ||
      wineType.length > 0 ||
      wineRegion.length > 0 ||
      wineRating.length > 0
    ) search()

    if (
      !searchQuery &&
      !wineType &&
      !wineRegion &&
      !wineRating
    ) {
      setResults([])
      setKeywords([])
    }

  }, [searchQuery, wineType, wineRegion, wineRating, searchByName, setKeywords, setResults])
}

export default useWineSearch
