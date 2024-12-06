"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { env } from "@/env";
import { useUser } from "@/hooks/use-user";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import DeleteAccountButton from "./delete-account-button";

export function SpotifyButton() {
  const supabase = createClient();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "spotify",
      options: {
        redirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        scopes: "user-read-email user-read-private user-top-read",
      },
    });
    if (error) {
      console.error("OAuth error", error);
    }
  };

  const { session } = useUser();

  return session ? (
    <div className="flex gap-4">
      <Link
        href={`/spotify/${session.user.user_metadata.name}`}
        className={cn(
          buttonVariants(),
          "w-min bg-green-500 hover:bg-green-600",
        )}
      >
        View Your Results
      </Link>
      <DeleteAccountButton />
    </div>
  ) : (
    <Button
      className="w-min bg-green-500 hover:bg-green-600"
      onClick={handleLogin}
    >
      Login with Spotify
    </Button>
  );
}
