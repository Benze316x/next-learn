"use client"
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import { useEffect, useState } from 'react';
import moment from 'moment';
export default function Home({  }) {
  type WeatherData = {
    name: string,
    main: any
  }
  const [data,setData] = useState<WeatherData>();
  const [counter,setCounter] = useState(0)
  const [city,setCity] = useState('cairo')
  // const [lastUpdatedTimestamp,setLastUpdatedTimestamp] = useState()
  useEffect(() => {
    getWeatherData()
    console.log(`**** initial city name is ${city}`)

  },[city])

  useEffect(() => {
    console.log(city)
  })

  async function getWeatherData(){
    const resp = await fetch("/api/waleed", {
    method: "POST",
    body: JSON.stringify({city})
    })
    const datafromTheApi = await resp.json()
    console.log("***** data returned is ")
    console.log(datafromTheApi)
    if(datafromTheApi) {
        setData(datafromTheApi)
    }
  }
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>


{data && data.main.temp && (
      <section className={utilStyles.headingMd}>
        <p>My Name is Waleed Jamal</p>
        <span>Enter City</span>
        <input type ="text" placeholder='Cairo' onChange={(e) => setCity(e.target.value)}></input>
          <p>the weather in {data.name} is soo cold its {data.main.temp} it feels like {data.main.feels_like} {' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>
        </p>
      </section>
      )}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>

      </section>
    </Layout>
  );
}

