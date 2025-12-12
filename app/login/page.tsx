"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";

function UserLoginContent() {
  const { loginUser } = useGlobalContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Phone Validation Regex (0300-1234567 or 03001234567)
    const phoneRegex = /^03\d{2}-?\d{7}$/;

    if (!name.trim()) {
        setError("Please enter your full name.");
        return;
    }

    if (!phoneRegex.test(phone)) {
        setError("Invalid phone number format. Use 0300-1234567 or 03001234567");
        return;
    }

    if (name && phone) {
      loginUser({ name, phone, image: "" });
      
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/"); 
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
      <div className="w-full max-w-sm bg-white p-10 shadow-2xl rounded-sm border border-gray-100 animate-fade-in">
        
        <div className="text-center mb-10">
          <h2 className="text-2xl font-serif font-bold text-gray-900 tracking-wide uppercase">Welcome Back</h2>
          <p className="text-xs text-gray-500 mt-2 tracking-wider uppercase">Sign in to access your account</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                placeholder="0300-1234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs font-medium text-center">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center py-3.5 px-4 border border-transparent text-xs font-bold uppercase tracking-[0.15em] text-white bg-black hover:bg-zinc-800 focus:outline-none transition-colors shadow-lg"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-gray-400">By continuing, you agree to our Terms of Use and Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
}

export default function UserLogin() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <UserLoginContent />
    </Suspense>
  );
}