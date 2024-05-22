import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'edge';
export async function POST(request: NextRequest) {
    const { name, lat, lon } = await request.json()
    const Api_Key = `b7e2617b6ab0da55497b2661a82ba80e`
    const City_Name = name ? name : `Khartoum`
    const Apiurl = lat ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&&appid=${Api_Key}&units=metric`
        : `https://api.openweathermap.org/data/2.5/weather?q=${City_Name}&appid=${Api_Key}&units=metric`
    console.log("*** url used is ")
    console.log(Apiurl)
    console.log(`city is ${name} lat is ${lat} lon is ${lon}`)
    const resp = await fetch(Apiurl);
    if (!resp.ok) {
        return Response.error()
    }
    const data = await resp.json()

    return Response.json(data)
    // return Response.json("ok")

}