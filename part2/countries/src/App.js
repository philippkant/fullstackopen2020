import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country, showDetail, setShowDetail}) => {
  const handleClick = () => {
    if (!showDetail || showDetail !== country) {
      setShowDetail(country)
    } else {
      setShowDetail(null)
    }
  }
  return (
    <div>
      {country.name}<button onClick={handleClick}>show</button>
    </div>
  )
}

const CountryDetail = ({country}) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt={`flag of ${country.name}`} width="20%"></img>
    </div>
  )
}

const Countries = ({countries, newFilter, showDetail, setShowDetail}) => {
  const filteredCountries = countries
    .filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))

  if (filteredCountries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  } else if (filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map(country => <Country key={country.name}
                                                    country={country}
                                                    showDetail={showDetail}
                                                    setShowDetail={setShowDetail}/>)}

        {showDetail
        ? <CountryDetail country={showDetail}/>
        : null
        }
      </div>)
  } else if (filteredCountries.length === 1) {
    return <CountryDetail key={filteredCountries[0].name} country={filteredCountries[0]}/>
  } else {
    return null
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [showDetail, setShowDetail] = useState(null)

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setShowDetail(null)
  }

  return (
    <div>
      find countries:
        <input
        value={newFilter}
        onChange={handleFilterChange}
        />
      <Countries countries={countries} newFilter={newFilter} showDetail={showDetail} setShowDetail={setShowDetail}/>
    </div>
  )
}

export default App
