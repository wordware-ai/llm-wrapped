"use client";

import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { createClient } from "@/lib/supabase/client";

export function SpotifyButton() {
  const supabase = createClient();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "spotify",
      options: {
        redirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/results`,
        scopes: "user-read-email user-read-private user-top-read",
      },
    });
    if (error) {
      console.error("OAuth error", error);
    }
  };

  return (
    <Button className="w-min bg-green-500" onClick={handleLogin}>
      Login with Spotify
    </Button>
  );
}
