import { NextRequest, NextResponse } from 'next/server';
import { Country, State, City, ICountry, ICity } from 'country-state-city';
export const runtime = 'edge';

export async function GET(request: NextRequest) {
    return Response.json("OK ya hussam")
}