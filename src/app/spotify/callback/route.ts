import { type NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { env } from "@/env";

export async function GET(request: NextRequest) {
  // Get code and state from URL params
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  // Handle error cases
  if (error) {
    return redirect(`/?error=${error}`);
  }

  if (!code || !state) {
    return redirect("/?error=missing_params");
  }

  // Verify state matches (you should store the original state in a cookie or session)
  // TODO: Add state verification

  try {
    // Exchange code for access token
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`,
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: env.SPOTIFY_REDIRECT_URI,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to exchange code for token");
    }

    const data = await response.json();
    console.log(data);

    // Store tokens securely (implement your storage solution)
    // TODO: Store access_token, refresh_token, expires_in, etc.

    // Redirect to success page or dashboard
    return redirect("/results");
  } catch (error) {
    console.error("Token exchange error:", error);
    return redirect("/?error=token_exchange_failed");
  }
}
