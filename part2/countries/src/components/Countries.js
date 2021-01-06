import React from 'react'
import Weather from './Weather'

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
      <Weather city={country.capital}/>
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

export default Countries