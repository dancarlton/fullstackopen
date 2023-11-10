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
    country.name.toLowerCase().includes(searchInput)
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
        filteredCountries.map(country => (
          <div key={country.name}>{country.name}</div>
        ))}
      {filteredCountries.length === 1 && (
        <>
          <h1>{filteredCountries[0].name}</h1>
          <div>capital {filteredCountries[0].capital}</div>
          <div>area {filteredCountries[0].area}</div>
          <h2>languages:</h2>
          <ul>
            {Object.values(filteredCountries[0].languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <div>
            <img
              src={filteredCountries[0].flags.png}
              alt={filteredCountries[0].flags.alt}
            />
          </div>
        </>
      )}
    </div>
  )
}
