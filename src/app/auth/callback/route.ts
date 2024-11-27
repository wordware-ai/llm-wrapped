import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { api } from "@/trpc/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = "/";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const existingUser = await api.users.getCurrent();
      if (existingUser) {
        next = `/${existingUser.id}`;
      } else {
        const user = await api.users.create({
          id: "n/a",
          username: (data.user.user_metadata as { name?: string }).name ?? null,
          email: data.user.email,
        });
        next = `/${user.id}`;
      }
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
