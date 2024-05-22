import { NextRequest, NextResponse } from 'next/server';
import { Country, State, City, ICountry, ICity } from 'country-state-city';
export const runtime = 'edge';

export async function POST(request: NextRequest) {
    const {cityStartsWith} = await request.json()
    const allCities = City.getAllCities()
    console.log(`***** alll city count is ${allCities.length} `)
    const filteredCities = allCities.filter(city => city.name.toLowerCase().startsWith(cityStartsWith.toLowerCase())).slice(0,10)
    console.log(`***** filtered city count is ${filteredCities.length} `)

    return Response.json(filteredCities)
}