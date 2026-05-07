"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white border border-gray-100 rounded-lg p-6 w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Sign in</h1>

        <label className="text-sm font-medium">Email</label>
        <input
          className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />

        <label className="text-sm font-medium mt-4 block">Password</label>
        <input
          className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />

        <button
          onClick={onLogin}
          className="mt-4 w-full bg-black text-white text-sm py-2 rounded-md"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}