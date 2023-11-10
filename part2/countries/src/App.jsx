import { useState, useEffect } from 'react'
import axios from 'axios'

export default function App() {
  const [countries, setCountries] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

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

  const handleShowCountry = country => {
    setSelectedCountry(country)
  }

  return (
    <div>
      <p>
        find countries <input type='text' onChange={handleSearch} />
      </p>
      {/* TOO MANY COUNTRIES */}
      {filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}
      {/* LESS THAN 10 COUNTRIES */}
      {filteredCountries.length <= 10 &&
        filteredCountries.length > 1 &&
        filteredCountries.map(country => (
          <div key={country.name}>
            {country.name}{' '}
            <button type='submit' onClick={() => handleShowCountry(country)}>
              show
            </button>
          </div>
        ))}
      {/* SHOW INFO ON 1 COUNTRY */}
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
      {/* SHOW INFO ON SELECTED COUNTRY */}
      {selectedCountry && (
        <>
          <h1>{selectedCountry.name}</h1>
          <div>capital {selectedCountry.capital}</div>
          <div>area {selectedCountry.area}</div>
          <h2>languages:</h2>
          <ul>
            {Object.values(selectedCountry.languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <div>
            <img
              src={selectedCountry.flags.png}
              alt={selectedCountry.flags.alt}
            />
          </div>
        </>
      )}
    </div>
  )
}
