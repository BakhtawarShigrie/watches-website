"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "watches123@") {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin"); // Redirect to the main Admin Page
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2eb]">
      <div className="bg-white p-8 rounded-sm shadow-xl w-full max-w-sm border border-gray-200">
        <h1 className="text-2xl font-serif font-bold mb-6 text-center text-black">Admin Panel</h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-sm text-sm text-black"
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-sm text-sm text-black"
            placeholder="Password"
            required
          />
          {error && <p className="text-red-600 text-xs">{error}</p>}
          <button type="submit" className="w-full bg-black text-white py-3 rounded-sm text-sm font-bold uppercase hover:bg-gray-800">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}