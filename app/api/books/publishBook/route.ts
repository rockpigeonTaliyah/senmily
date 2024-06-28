// pages/api/books/index.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function POST(req: NextRequest) {
    const req_data = await req.json();
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET!,
        secureCookie: process.env.NODE_ENV === "production",
        salt:
          process.env.NODE_ENV === "production"
            ? "__Secure-authjs.session-token"
            : "authjs.session-token",
    });

    if (!token) {
        return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }

    try {
        console.log("bookData",req_data);
        
        const apiResponse = await fetch(`https://1aiguxjs8e.execute-api.ap-southeast-1.amazonaws.com/prod/books/publish`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.idToken}`,  // Note the correct casing for the token property
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req_data),
        });

        if (!apiResponse.ok) {
            console.error('Error Response Body:', await apiResponse.text());
            return NextResponse.json({ error: 'Failed to fetch data from API' }, { status: apiResponse.status });
        }
        console.log('API response:', apiResponse.body);
        const data = await apiResponse.json();
        // console.log('API response:', apiResponse);
        console.log('API response data:', data);

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching data from API:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}