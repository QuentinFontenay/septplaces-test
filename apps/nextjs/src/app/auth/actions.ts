"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export const signInWithPassword = async (email: string, password: string) => {
  const supabase = createServerActionClient({ cookies });

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return {
    error: error.message,
    success: false,
  };
  return {
    user: data.user,
    success: true,
  };
};

export const signUp = async (email: string, password: string) => {
  const supabase = createServerActionClient({ cookies });
  const origin = headers().get("origin");
  console.log("origin", origin);
  console.log(email, password)

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) return {
    error: error.message,
    success: false,
  };
  return {
    user: data.user,
    success: true,
  };
};

export const signInWithGithub = async () => {
  const origin = headers().get("origin");
  const supabase = createServerActionClient({ cookies });

  const res = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo: `${origin}/auth/callback` },
  });

  if (res.data.url) redirect(res.data.url);
  throw res.error;
};

export const signOut = async () => {
  const supabase = createServerActionClient({ cookies });
  await supabase.auth.signOut();
  redirect("/");
};