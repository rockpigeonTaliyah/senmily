
import { NextResponse } from "next/server";
import { NextRequest } from 'next/server'

export async function GET(req,res) {
  // ...
  return NextResponse.json([
    {
        id : 0,
        content:"https://media.istockphoto.com/id/1276936276/zh/照片/創意背景-在線賭場-在男人的手中-智慧手機與撲克牌-輪盤賭和晶元-黑金背景網路賭博概念複製空間.jpg?s=1024x1024&w=is&k=20&c=uBh7SssrXK6UhZsIjSWoaSqCAD4SdOWDoipOgGpUD-w="
    },
    {
        id : 0,
        content:"https://media.istockphoto.com/id/1276936276/zh/照片/創意背景-在線賭場-在男人的手中-智慧手機與撲克牌-輪盤賭和晶元-黑金背景網路賭博概念複製空間.jpg?s=1024x1024&w=is&k=20&c=uBh7SssrXK6UhZsIjSWoaSqCAD4SdOWDoipOgGpUD-w="
    },
    {
        id : 0,
        content:"https://media.istockphoto.com/id/1276936276/zh/照片/創意背景-在線賭場-在男人的手中-智慧手機與撲克牌-輪盤賭和晶元-黑金背景網路賭博概念複製空間.jpg?s=1024x1024&w=is&k=20&c=uBh7SssrXK6UhZsIjSWoaSqCAD4SdOWDoipOgGpUD-w="
    },
    {
        id : 0,
        content:"https://media.istockphoto.com/id/1276936276/zh/照片/創意背景-在線賭場-在男人的手中-智慧手機與撲克牌-輪盤賭和晶元-黑金背景網路賭博概念複製空間.jpg?s=1024x1024&w=is&k=20&c=uBh7SssrXK6UhZsIjSWoaSqCAD4SdOWDoipOgGpUD-w="
    },
    {
        id : 0,
        content:"https://media.istockphoto.com/id/1276936276/zh/照片/創意背景-在線賭場-在男人的手中-智慧手機與撲克牌-輪盤賭和晶元-黑金背景網路賭博概念複製空間.jpg?s=1024x1024&w=is&k=20&c=uBh7SssrXK6UhZsIjSWoaSqCAD4SdOWDoipOgGpUD-w="
    },
    {
        id : 0,
        content:"https://media.istockphoto.com/id/1276936276/zh/照片/創意背景-在線賭場-在男人的手中-智慧手機與撲克牌-輪盤賭和晶元-黑金背景網路賭博概念複製空間.jpg?s=1024x1024&w=is&k=20&c=uBh7SssrXK6UhZsIjSWoaSqCAD4SdOWDoipOgGpUD-w="
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