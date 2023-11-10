import { useState, useEffect } from 'react'
import axios from 'axios'

export default function App() {
  const [countries, setCountries] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState([])

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
      .catch(err =>
        console.log('Error connecting to Countries API:', err.message)
      )
  }, [])

  useEffect(() => {
    axios
      .get(
        'http://api.openweathermap.org/data/2.5/weather?id=524901&appid=e72724f29c2a5cbf5d71f86ca51861d7'
      )
      .then(response => {
        console.log(response.data)
        const weatherData = {
          icon: response.data.weather && response.data.weather[0].icon,
          temperature:
            response.data.main &&
            Math.round(kelvinToCelcius(response.data.main.temp) * 10) / 10,
          wind: response.data.wind && response.data.wind.speed,
        }
        setWeather(weatherData)
      })
      .catch(err =>
        console.log('Error connecting to Weather API:', err.message)
      )
  }, [])

  const handleSearch = e => {
    e.preventDefault()
    setSearchInput(e.target.value)
    searchInput('')
  }

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchInput)
  )

  const handleShowCountry = country => {
    setSelectedCountry(country)
  }

  const kelvinToCelcius = kelvin => kelvin - 273.15

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
          {/* SHOW WEATHER ON CURRENT COUNTRY */}
          <h2>Weather in {filteredCountries[0].capital}</h2>
          <p>temperature {weather.temperature} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          />
          <p>wind {weather.wind} m/s</p>
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
