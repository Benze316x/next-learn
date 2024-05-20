import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'edge';
export async function POST(request: NextRequest) {
    const {city} = await request.json()
    console.log("**** city is")
    console.log(city)
    const Api_Key =`b7e2617b6ab0da55497b2661a82ba80e`
    const City_Name = city ?? `Khartoum`
    const Apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${City_Name}&appid=${Api_Key}&units=metric`;
    const resp = await fetch(Apiurl);
    if(!resp.ok) {
        return Response.error()
    }
    const data = await resp.json()

    console.log("the weather is", data)
    return Response.json(data)

    // return Response.json("ok")

}