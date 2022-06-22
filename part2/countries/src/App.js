import {useState, useEffect} from 'react';
import axios from 'axios';

const OpenCountry = ({country}) => {
  const [open, setOpen] = useState(false);

  const {name, languages, flags, capital, area} = country;

  const handleShow = (event) => {
    event.preventDefault();
    setOpen(!open);
  }

  return (
    <div>
      <div>
        <p>{name.common}</p>
        <button type='button' onClick={handleShow}>{open ? 'hide' : 'show'}</button>
      </div>
        {
          open ? 
            <div>
              <h2>{name.common}</h2>
              <p>capital {capital}</p>
              <p>area {area}</p>
              <h4>languages:</h4>
              <ul>
                {Object.values(languages).map((item, index)=> <li key={index}>{item}</li>)}
              </ul>
              <img src={flags['png']} alt='flag'/>
              <Weather capital={capital}/>
            </div>
          : null
        }
    </div>
  )
}

const Weather = ({capital}) => {
  const [data, setData] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  const api_key = process.env.REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`;

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setData(response.data);
        setIsFetched(!isFetched);
      })
  }, [url])
  return (
    isFetched ? <div key={capital}>
      {console.log(data)}
        <h3>Weather in {capital}</h3>
        <p>temperature {(data.main.temp - 273.15).toFixed(1)} Celcius</p>
        <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt='icon'/>
        <p>wind {data.wind.speed} m/s</p>
      </div> :
    null
  )
}

const Country = ({countries, filterValue}) => {
  const countriesList = 
    countries
      .filter(country => country.name.common.toLowerCase()
      .indexOf(filterValue.toLowerCase()) > -1 || filterValue === '')
      .map((country, index) => {
        return (
          <OpenCountry key={index} country={country}/>
        )
      })

  const specificCountry = 
    countries.filter(country => country.name.common.toLowerCase()
      .indexOf(filterValue.toLowerCase()) > -1 || filterValue === '')
      .map(country => {
        return (
          country
        )
      })

  const countriesLength = countriesList.length;

    if(filterValue.length === 0) {
      return '';
    } else if (countriesLength > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (countriesLength === 1) {

      const {name, languages, flags, capital, area} = specificCountry[0];

      return (
        <div>
          <h2>{name.common}</h2>
          <p>capital {capital}</p>
          <p>area {area}</p>
          <h4>languages:</h4>
          <ul>
            {Object.values(languages).map((item, index)=> <li key={index}>{item}</li>)}
          </ul>
          <img src={flags['png']} alt='flag'/>
          <Weather capital={capital}/>
        </div>
      )
    } else {
      return countriesList;
    }
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data);
      })
  }, [])

  const handleSearchChange = event => {
    setCountry(event.target.value);
  }
  
  return (
    <div>
      <form>
        <div>
          find countries <input onChange={handleSearchChange}/>
        </div>
      </form>
      <Country countries={countries} filterValue={country}/>
    </div>
  )
}

export default App;
