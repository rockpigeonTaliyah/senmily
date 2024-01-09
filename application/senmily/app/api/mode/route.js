
import { NextResponse } from "next/server";
import { NextRequest } from 'next/server'

export async function GET(req,res) {
  // ...
  return NextResponse.json([
    {
        id : 0,
        content:"https://media.istockphoto.com/id/1426025965/zh/%E7%85%A7%E7%89%87/light-trails-from-rush-hour-traffic-light-up-walterdale-bridge-in-edmonton-canada-on-a-sunset.jpg?s=1024x1024&w=is&k=20&c=Lx033BhquqrAGybq49BOeLgKLG2MRBE1On-Leru5lC8="
    },
    {
        id : 0,
        content:"https://media.istockphoto.com/id/1426025965/zh/%E7%85%A7%E7%89%87/light-trails-from-rush-hour-traffic-light-up-walterdale-bridge-in-edmonton-canada-on-a-sunset.jpg?s=1024x1024&w=is&k=20&c=Lx033BhquqrAGybq49BOeLgKLG2MRBE1On-Leru5lC8="
    },
    {
        id : 0,
        content:"https://media.istockphoto.com/id/1426025965/zh/%E7%85%A7%E7%89%87/light-trails-from-rush-hour-traffic-light-up-walterdale-bridge-in-edmonton-canada-on-a-sunset.jpg?s=1024x1024&w=is&k=20&c=Lx033BhquqrAGybq49BOeLgKLG2MRBE1On-Leru5lC8="
    },
    {
        id : 0,
        content:"https://media.istockphoto.com/id/1426025965/zh/%E7%85%A7%E7%89%87/light-trails-from-rush-hour-traffic-light-up-walterdale-bridge-in-edmonton-canada-on-a-sunset.jpg?s=1024x1024&w=is&k=20&c=Lx033BhquqrAGybq49BOeLgKLG2MRBE1On-Leru5lC8="
    },
    {
        id : 0,
        content:"https://media.istockphoto.com/id/1426025965/zh/%E7%85%A7%E7%89%87/light-trails-from-rush-hour-traffic-light-up-walterdale-bridge-in-edmonton-canada-on-a-sunset.jpg?s=1024x1024&w=is&k=20&c=Lx033BhquqrAGybq49BOeLgKLG2MRBE1On-Leru5lC8="
    },
    {
        id : 0,
        content:"https://media.istockphoto.com/id/1426025965/zh/%E7%85%A7%E7%89%87/light-trails-from-rush-hour-traffic-light-up-walterdale-bridge-in-edmonton-canada-on-a-sunset.jpg?s=1024x1024&w=is&k=20&c=Lx033BhquqrAGybq49BOeLgKLG2MRBE1On-Leru5lC8="
    }
],
{
    status: 200,
    headers: { "content-type": "application/json" }
});
}

// Handles POST requests to /api
export async function POST(req,res) {
  // ...
  return NextResponse.json([
    {
        id : 0,
        content:"test Post"
    }
],
{
    status: 200,
    headers: { "content-type": "application/json" }
});
}