import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'edge';
export default async function GET(request: Request) {
    const Api_Key =`b7e2617b6ab0da55497b2661a82ba80e`
    const City_Name = `United Kingdom`
    const Apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${City_Name}&appid=${Api_Key}`;
    const resp = await fetch(Apiurl);
    const data = await resp.json()
    console.log(`***** resp is  `)
    console.log(resp)
    console.log("the weather is", data)
    return Response.json(data)

    // return Response.json("ok")

}