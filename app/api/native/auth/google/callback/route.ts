import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_ID || "",
      client_secret: process.env.GOOGLE_SECRET || "",
      redirect_uri: "https://bookshelf-olive-mu.vercel.app/api/native/auth/google/callback",
      grant_type: "authorization_code",
      code,
    }),
  });

  const tokenData = await tokenResponse.json();
  if (!tokenResponse.ok) {
    return NextResponse.json({ error: tokenData }, { status: 400 });
  }

  // 取得したアクセストークンをクライアントへリダイレクト
  const redirectUrl = `bookshelf-app://auth?access_token=${tokenData.access_token}`;
  return NextResponse.redirect(redirectUrl);
}
