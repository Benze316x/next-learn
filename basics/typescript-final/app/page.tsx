"use client"
import Head from 'next/head';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import { Country, State, City, ICountry, ICity } from 'country-state-city';

import { useEffect, useState } from 'react';
// import moment from 'moment';
export default function Page({ }) {
  type WeatherData = {
    name: string,
    main: any
  }
  const [data, setData] = useState<WeatherData>();
  const [counter, setCounter] = useState(0)
  const [city, setCity] = useState<ICity>()
  const [users, setUsers] = useState([])
  const [cities, setCities] = useState<ICity[]>([])
  const [countries, setCountries] = useState<ICountry[]>([])

  const [searchValue, setSearchValue] = useState('')

  async function getWeatherData(city?:ICity) {
    console.log("**** at get weather data city is")
    console.log(city)
    const requestBody = city ? { lat: city.latitude, lon: city.longitude} : {city: {name: "Khartoum"}};
    const resp = await fetch("/api/waleed", {
      method: "POST",
      body: JSON.stringify(requestBody)
    })
    const datafromTheApi = await resp.json()
    console.log("***** data returned is ")
    console.log(datafromTheApi)
    if (datafromTheApi) {
      setData(datafromTheApi)
    }
  }

  async function handleCityChanged(cityName: any) {
    console.log("****** chosen city is ")
    console.log(cityName)
    const chosenCity = cities.find(c => c.name === cityName)
    if (chosenCity) {
      setCity(chosenCity)
      await getWeatherData(chosenCity)
    }
  }
  async function handleSearchChanged(cityStartsWith: string) {
    setSearchValue(cityStartsWith)
    const resp = await fetch("/api/cities", {
      method: "POST",
      body: JSON.stringify({ cityStartsWith })
    })
    const citiesFromApi = await resp.json() as ICity[]
    if (citiesFromApi) { 
    const foundCity = citiesFromApi.filter(city => city.name.toLowerCase() === cityStartsWith.toLowerCase())[0]
    if(foundCity) {
      console.log(`**** only one city which is ${JSON.stringify(foundCity)}`)
      setCity(foundCity)
      await getWeatherData(foundCity)
    }
      setCities(citiesFromApi)
    }
  }
  return (
    < >


        <section>
        <p>My Name is Waleed Jamal</p>
        <span>Enter City</span>

        <div className='flex space-x-4'>
          <input type="text" placeholder='enter City' value={searchValue} onChange={(e) => handleSearchChanged(e.target.value)}></input>

          <select onChange={(e) => handleCityChanged(e.currentTarget.value)}>
            {cities && cities.map((city, index) => (
              <option key={index} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          </div>
      
          {data && data.main.temp &&(
            <p>the weather in {data.name} is {data.main.temp}  and it feels like {data.main.feels_like} {' '}
            <a href="https://nextjs.org/learn">our Next.js tutorial</a>
          </p>
          )}
          
        </section>
      <section >
        <h2>Blog</h2>

      </section>
    </>
  );
}

