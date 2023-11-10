import { useState, useEffect } from 'react'
import axios from 'axios'

export default function App() {
  const [countries, setCountries] = useState([])
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(
          response.data.map(({ name, capital, area, languages, flags }) => ({
            name: name.common,
            capital,
            area,
            languages,
            flags,
          }))
        )
      })
      .catch(err => console.log('Error connecting to API:', err.message))
  }, [])

  const handleSearch = e => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  const filteredCountries = countries.filter(country =>
    country.name.includes(searchInput)
  )

  return (
    <div>
      <p>
        find countries <input type='text' onChange={handleSearch} />
      </p>
      {filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}
      {filteredCountries.length <= 10 &&
        filteredCountries.length > 1 &&
        filteredCountries.map(country => <div>{country.name}</div>)}
    </div>
  )
}
